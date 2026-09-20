package lk.signalfusion.mobile.data.websocket

import okhttp3.*
import org.json.JSONObject
import lk.signalfusion.mobile.domain.model.CellularTelemetry
import java.util.concurrent.TimeUnit

class TelemetryWebSocketClient(
    private val serverUrl: String = "wss://api.signalfusion.lk/v1/realtime/device",
    private val pairingToken: String
) {
    private val client = OkHttpClient.Builder()
        .readTimeout(0, TimeUnit.MILLISECONDS)
        .build()

    private var webSocket: WebSocket? = null
    var isConnected: Boolean = false
        private set

    fun connect() {
        val request = Request.Builder()
            .url("$serverUrl?token=$pairingToken")
            .build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(ws: WebSocket, response: Response) {
                isConnected = true
            }

            override fun onMessage(ws: WebSocket, text: String) {
                // Handle remote commands like "BOOST_NOW" or "TRIGGER_SPEED_TEST"
            }

            override fun onClosing(ws: WebSocket, code: Int, reason: String) {
                isConnected = false
            }

            override fun onFailure(ws: WebSocket, t: Throwable, response: Response?) {
                isConnected = false
            }
        })
    }

    fun streamTelemetry(telemetry: CellularTelemetry) {
        if (!isConnected || webSocket == null) return

        val json = JSONObject().apply {
            put("event_type", "signal.update")
            put("timestamp", System.currentTimeMillis())
            put("data", JSONObject().apply {
                put("operator", telemetry.operator)
                put("networkType", telemetry.networkGeneration)
                put("signalDbm", telemetry.signalDbm)
                put("rsrp", telemetry.ssRsrp ?: telemetry.lteRsrp)
                put("rsrq", telemetry.ssRsrq ?: telemetry.lteRsrq)
                put("sinr", telemetry.ssSinr ?: telemetry.lteSinr)
                put("cellId", telemetry.cellId)
                put("pci", telemetry.pci)
                put("tac", telemetry.tac)
            })
        }
        webSocket?.send(json.toString())
    }

    fun disconnect() {
        webSocket?.close(1000, "Client closed")
        isConnected = false
    }
}
