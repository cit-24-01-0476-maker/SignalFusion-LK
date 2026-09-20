package lk.signalfusion.mobile.data.telephony

import android.annotation.SuppressLint
import android.content.Context
import android.os.Build
import android.telephony.*
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import lk.signalfusion.mobile.domain.model.CellularTelemetry

class TelephonyEngine(private val context: Context) {

    private val telephonyManager: TelephonyManager =
        context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

    fun resolveSriLankaOperator(mnc: String?): String {
        return when (mnc) {
            "02" -> "Dialog"
            "01" -> "SLT-Mobitel"
            "05" -> "Airtel"
            "08" -> "Hutch"
            else -> telephonyManager.networkOperatorName.ifEmpty { "Dialog" }
        }
    }

    @SuppressLint("MissingPermission")
    fun observeCellularTelemetry(): Flow<CellularTelemetry> = callbackFlow {
        val cellInfoCallback = object : TelephonyCallback(), TelephonyCallback.CellInfoListener {
            override fun onCellInfoChanged(cellInfoList: List<CellInfo>) {
                val telemetry = parseCellInfoList(cellInfoList)
                if (telemetry != null) {
                    trySend(telemetry)
                }
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            telephonyManager.registerTelephonyCallback(
                context.mainExecutor,
                cellInfoCallback
            )
        }

        // Initial fetch
        val initialInfo = telephonyManager.allCellInfo
        val initialTelemetry = parseCellInfoList(initialInfo)
        if (initialTelemetry != null) {
            trySend(initialTelemetry)
        }

        awaitClose {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                telephonyManager.unregisterTelephonyCallback(cellInfoCallback)
            }
        }
    }

    private fun parseCellInfoList(cellInfoList: List<CellInfo>?): CellularTelemetry? {
        if (cellInfoList.isNullOrEmpty()) return null

        for (info in cellInfoList) {
            if (!info.isRegistered) continue

            // 5G NR parsing
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q && info is CellInfoNr) {
                val identity = info.cellIdentity as? CellIdentityNr
                val signal = info.cellSignalStrength as? CellSignalStrengthNr
                val mnc = identity?.mncString ?: "02"
                val op = resolveSriLankaOperator(mnc)

                return CellularTelemetry(
                    operator = op,
                    mcc = identity?.mccString ?: "413",
                    mnc = mnc,
                    networkGeneration = "5G NR",
                    signalDbm = signal?.dbm ?: -83,
                    ssRsrp = signal?.ssRsrp,
                    ssRsrq = signal?.ssRsrq,
                    ssSinr = signal?.ssSinr,
                    csiRsrp = signal?.csiRsrp,
                    csiRsrq = signal?.csiRsrq,
                    csiSinr = signal?.csiSinr,
                    pci = identity?.pci,
                    tac = identity?.tac,
                    cellId = identity?.nci
                )
            }

            // 4G LTE parsing
            if (info is CellInfoLte) {
                val identity = info.cellIdentity
                val signal = info.cellSignalStrength
                val mnc = identity.mncString ?: "02"
                val op = resolveSriLankaOperator(mnc)

                return CellularTelemetry(
                    operator = op,
                    mcc = identity.mccString ?: "413",
                    mnc = mnc,
                    networkGeneration = "4G LTE",
                    signalDbm = signal.dbm,
                    lteRsrp = signal.rsrp,
                    lteRsrq = signal.rsrq,
                    lteSinr = signal.rssnr,
                    lteRssi = signal.rssi,
                    pci = identity.pci,
                    tac = identity.tac,
                    cellId = identity.ci.toLong(),
                    earfcn = identity.earfcn
                )
            }
        }
        return null
    }
}
