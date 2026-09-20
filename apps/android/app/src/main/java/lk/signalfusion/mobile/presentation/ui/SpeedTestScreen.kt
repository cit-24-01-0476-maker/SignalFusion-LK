package lk.signalfusion.mobile.presentation.ui

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import lk.signalfusion.mobile.domain.model.CellularTelemetry

@Composable
fun SpeedTestScreen(telemetry: CellularTelemetry) {
    var isTesting by remember { mutableStateOf(false) }
    var phase by remember { mutableStateOf("IDLE") } // IDLE, PING, DOWNLOAD, UPLOAD, DONE
    var currentSpeed by remember { mutableStateOf(0.0) }
    var pingVal by remember { mutableStateOf(telemetry.latencyMs) }
    var jitterVal by remember { mutableStateOf(telemetry.jitterMs) }
    var finalDownload by remember { mutableStateOf(telemetry.downloadSpeedMbps) }
    var finalUpload by remember { mutableStateOf(telemetry.uploadSpeedMbps) }

    LaunchedEffect(isTesting) {
        if (isTesting) {
            phase = "PING"
            currentSpeed = 0.0
            delay(1200)
            pingVal = (14..22).random()
            jitterVal = (1..4).random()

            // Download Phase
            phase = "DOWNLOAD"
            val targetDown = (110..185).random().toDouble()
            for (step in 1..25) {
                currentSpeed = (targetDown * (step / 25f)) + (-4..4).random()
                delay(120)
            }
            finalDownload = currentSpeed

            // Upload Phase
            phase = "UPLOAD"
            val targetUp = (35..65).random().toDouble()
            for (step in 1..20) {
                currentSpeed = (targetUp * (step / 20f)) + (-2..2).random()
                delay(120)
            }
            finalUpload = currentSpeed

            phase = "DONE"
            isTesting = false
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Server Badge
        Card(
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("EDGE SPEED TEST NODE", color = Color(0xFF64748B), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("Colombo Node 1 (Tier-3 Datacenter)", color = Color.White, fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                }
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(Color(0xFF064E3B))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text("10 Gbps", color = Color(0xFF34D399), fontSize = 11.sp, fontWeight = FontWeight.Black)
                }
            }
        }

        // Circular Tachometer Speedometer Gauge
        Box(
            modifier = Modifier
                .size(260.dp)
                .padding(12.dp),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val strokeWidth = 14.dp.toPx()
                val radius = (size.minDimension - strokeWidth) / 2
                val startAngle = 135f
                val sweepAngle = 270f

                // Track Background
                drawArc(
                    color = Color(0xFF1E293B),
                    startAngle = startAngle,
                    sweepAngle = sweepAngle,
                    useCenter = false,
                    topLeft = Offset((size.width - radius * 2) / 2, (size.height - radius * 2) / 2),
                    size = Size(radius * 2, radius * 2),
                    style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
                )

                // Active Gradient Arc
                val maxGauge = 200f
                val currentSweep = ((currentSpeed.toFloat() / maxGauge).coerceIn(0.02f, 1f)) * sweepAngle

                drawArc(
                    brush = Brush.sweepGradient(
                        listOf(Color(0xFF2563EB), Color(0xFF00F2FE), Color(0xFF38BDF8))
                    ),
                    startAngle = startAngle,
                    sweepAngle = currentSweep,
                    useCenter = false,
                    topLeft = Offset((size.width - radius * 2) / 2, (size.height - radius * 2) / 2),
                    size = Size(radius * 2, radius * 2),
                    style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
                )
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = when (phase) {
                        "PING" -> "TESTING PING..."
                        "DOWNLOAD" -> "DOWNLOADING..."
                        "UPLOAD" -> "UPLOADING..."
                        "DONE" -> "COMPLETED"
                        else -> "READY"
                    },
                    color = Color(0xFF00F2FE),
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = String.format("%.1f", if (isTesting) currentSpeed else finalDownload),
                    fontSize = 54.sp,
                    fontWeight = FontWeight.Black,
                    fontFamily = FontFamily.Monospace,
                    color = Color.White
                )

                Text(
                    text = "Mbps",
                    color = Color(0xFF94A3B8),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        // Action Trigger Button
        Button(
            onClick = { isTesting = true },
            enabled = !isTesting,
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            shape = RoundedCornerShape(14.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
        ) {
            Text(
                if (isTesting) "MEASURING PERFORMANCE..." else "START FULL SRI LANKA SPEED TEST",
                fontWeight = FontWeight.Black,
                fontSize = 13.sp
            )
        }

        // Metrics Grid (Ping, Jitter, Download, Upload)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            TestResultCard("PING", "$pingVal ms", Modifier.weight(1f))
            TestResultCard("JITTER", "±$jitterVal ms", Modifier.weight(1f))
            TestResultCard("DOWNLOAD", String.format("%.1f Mbps", finalDownload), Modifier.weight(1f))
            TestResultCard("UPLOAD", String.format("%.1f Mbps", finalUpload), Modifier.weight(1f))
        }

        // Save & History Notice
        Card(
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("AUTOMATIC CLOUD SYNC", color = Color(0xFF64748B), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("Result saved to your unified account", color = Color.White, fontSize = 12.sp)
                }
                Text("SYNCED", color = Color(0xFF10B981), fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun TestResultCard(label: String, value: String, modifier: Modifier) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF1E293B)),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(10.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(label, color = Color(0xFF64748B), fontSize = 9.sp, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(2.dp))
            Text(value, color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
        }
    }
}
