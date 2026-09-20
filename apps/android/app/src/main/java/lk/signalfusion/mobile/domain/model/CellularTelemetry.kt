package lk.signalfusion.mobile.domain.model

data class CellularTelemetry(
    val operator: String, // Dialog, SLT-Mobitel, Airtel, Hutch
    val mcc: String = "413",
    val mnc: String,
    val networkGeneration: String, // 4G LTE, 5G NR
    val signalDbm: Int,
    // 4G LTE Metrics
    val lteRsrp: Int? = null,
    val lteRsrq: Int? = null,
    val lteSinr: Int? = null,
    val lteRssi: Int? = null,
    // 5G NR Metrics
    val ssRsrp: Int? = null,
    val ssRsrq: Int? = null,
    val ssSinr: Int? = null,
    val csiRsrp: Int? = null,
    val csiRsrq: Int? = null,
    val csiSinr: Int? = null,
    // Cell info
    val cellId: Long? = null,
    val pci: Int? = null,
    val tac: Int? = null,
    val earfcn: Int? = null,
    val simSlotIndex: Int = 0,
    val timestamp: Long = System.currentTimeMillis()
)
