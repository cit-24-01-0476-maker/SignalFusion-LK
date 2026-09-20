package lk.signalfusion.mobile.domain.model

data class CellularTelemetry(
    val operator: String = "Dialog", // Dialog, SLT-Mobitel, Airtel, Hutch
    val mcc: String = "413",
    val mnc: String = "02",
    val networkGeneration: String = "5G NR", // 4G LTE, 5G NR, 3G HSPA
    val signalDbm: Int = -83,
    // 4G LTE Metrics
    val lteRsrp: Int? = -88,
    val lteRsrq: Int? = -11,
    val lteSinr: Int? = 16,
    val lteRssi: Int? = -62,
    // 5G NR Metrics
    val ssRsrp: Int? = -83,
    val ssRsrq: Int? = -10,
    val ssSinr: Int? = 19,
    val csiRsrp: Int? = -85,
    val csiRsrq: Int? = -9,
    val csiSinr: Int? = 21,
    // Cell info
    val cellId: Long? = 4130289,
    val pci: Int? = 246,
    val tac: Int? = 5012,
    val earfcn: Int? = 1650,
    val simSlotIndex: Int = 0,
    val sim1Operator: String = "Dialog Axiata",
    val sim2Operator: String? = "SLT-Mobitel",
    val latencyMs: Int = 18,
    val jitterMs: Int = 3,
    val packetLossPct: Double = 0.0,
    val downloadSpeedMbps: Double = 142.8,
    val uploadSpeedMbps: Double = 48.2,
    val healthScore: Int = 94,
    val timestamp: Long = System.currentTimeMillis()
)
