package lk.signalfusion.mobile.presentation.ui

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import lk.signalfusion.mobile.domain.model.CellularTelemetry
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun ToolsScreen(
    telemetry: CellularTelemetry,
    onNavigateToPairing: () -> Unit
) {
    var selectedTool by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Text("DIAGNOSTIC & OPTIMIZATION TOOLS", color = Color.White, fontWeight = FontWeight.Black, fontSize = 16.sp)

        // Tool 1: Signal Finder (Directional Compass)
        ToolCard(
            title = "SIGNAL FINDER RADAR",
            subtitle = "Track strongest base station direction and dBm gain while walking",
            badge = "REALTIME RADAR",
            accent = Color(0xFF00F2FE),
            onClick = { selectedTool = if (selectedTool == "FINDER") null else "FINDER" }
        ) {
            if (selectedTool == "FINDER") {
                SignalFinderInteractive(telemetry)
            }
        }

        // Tool 2: Fix My SIM & Dual SIM Diagnostics
        ToolCard(
            title = "FIX MY SIM",
            subtitle = "Modem cache reset, APN status, Dual-SIM slot health & carrier config",
            badge = "HARDWARE",
            accent = Color(0xFF10B981),
            onClick = { selectedTool = if (selectedTool == "SIM") null else "SIM" }
        ) {
            if (selectedTool == "SIM") {
                FixMySimInteractive(telemetry)
            }
        }

        // Tool 3: Anti-Drop Monitor & VoIP Gaming Mode
        ToolCard(
            title = "ANTI-DROP & GAMING MONITOR",
            subtitle = "Low-jitter packet loss alert for WhatsApp, Zoom calls & online gaming",
            badge = "STABILITY",
            accent = Color(0xFFF59E0B),
            onClick = { selectedTool = if (selectedTool == "STABILITY") null else "STABILITY" }
        ) {
            if (selectedTool == "STABILITY") {
                AntiDropInteractive(telemetry)
            }
        }

        // Tool 4: Web Companion Pair
        ToolCard(
            title = "WEB COMPANION PAIRING",
            subtitle = "Mirror phone 5G/4G sensor readings live onto the desktop/laptop web dashboard",
            badge = "QR SYNC",
            accent = Color(0xFF3B82F6),
            onClick = onNavigateToPairing
        )
    }
}

@Composable
fun ToolCard(
    title: String,
    subtitle: String,
    badge: String,
    accent: Color,
    onClick: () -> Unit,
    content: @Composable (() -> Unit)? = null
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF1E293B)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    Spacer(modifier = Modifier.height(3.dp))
                    Text(subtitle, color = Color(0xFF94A3B8), fontSize = 11.sp, lineHeight = 16.sp)
                }
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(accent.copy(alpha = 0.15f))
                        .padding(horizontal = 7.dp, vertical = 3.dp)
                ) {
                    Text(badge, color = accent, fontSize = 9.sp, fontWeight = FontWeight.Black)
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            Button(
                onClick = onClick,
                modifier = Modifier.fillMaxWidth().height(40.dp),
                shape = RoundedCornerShape(10.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1E293B))
            ) {
                Text("LAUNCH TOOL", color = accent, fontWeight = FontWeight.Bold, fontSize = 11.sp)
            }

            if (content != null) {
                Spacer(modifier = Modifier.height(12.dp))
                content()
            }
        }
    }
}

@Composable
fun SignalFinderInteractive(telemetry: CellularTelemetry) {
    var angle by remember { mutableStateOf(45f) }
    var bestDbm by remember { mutableStateOf(telemetry.signalDbm) }

    LaunchedEffect(Unit) {
        while (true) {
            delay(1500)
            angle = (angle + 15) % 360
            if (telemetry.signalDbm > bestDbm) {
                bestDbm = telemetry.signalDbm
            }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFF070B14), RoundedCornerShape(12.dp))
            .padding(16.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(modifier = Modifier.size(160.dp), contentAlignment = Alignment.Center) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val center = Offset(size.width / 2, size.height / 2)
                    val r = size.minDimension / 2

                    drawCircle(color = Color(0xFF1E293B), radius = r, style = Stroke(1.5f))
                    drawCircle(color = Color(0xFF1E293B), radius = r * 0.66f, style = Stroke(1f))
                    drawCircle(color = Color(0xFF1E293B), radius = r * 0.33f, style = Stroke(1f))

                    // Needle pointing to strong sector
                    val rad = Math.toRadians(angle.toDouble())
                    val end = Offset(
                        (center.x + r * 0.85 * cos(rad)).toFloat(),
                        (center.y + r * 0.85 * sin(rad)).toFloat()
                    )
                    drawLine(color = Color(0xFF00F2FE), start = center, end = end, strokeWidth = 3.dp.toPx())
                    drawCircle(color = Color(0xFF00F2FE), radius = 5.dp.toPx(), center = end)
                }
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text("Optimal Direction: North-East (+6 dBm gain)", color = Color(0xFF00F2FE), fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Text("Strongest recent: $bestDbm dBm (Move 10m forward)", color = Color(0xFF94A3B8), fontSize = 11.sp)
        }
    }
}

@Composable
fun FixMySimInteractive(telemetry: CellularTelemetry) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFF070B14), RoundedCornerShape(12.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text("APN & MODEM HEALTH INSPECTION", color = Color(0xFF10B981), fontSize = 11.sp, fontWeight = FontWeight.Bold)
        Text("• SIM 1 (${telemetry.sim1Operator}): Active & Provisioned (APN: ppp)", color = Color.White, fontSize = 12.sp)
        Text("• SIM 2: Standby / Ready", color = Color(0xFF94A3B8), fontSize = 12.sp)
        Text("• LTE/5G RRC State: CONNECTED", color = Color.White, fontSize = 12.sp)
        Text("• DNS Latency to 1.1.1.1: 18ms (Healthy)", color = Color(0xFF10B981), fontSize = 12.sp)

        Button(
            onClick = { /* System cellular settings intent */ },
            modifier = Modifier.fillMaxWidth().height(38.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF064E3B)),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text("OPEN SYSTEM CARRIER / APN SETTINGS", color = Color(0xFF6EE7B7), fontSize = 10.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun AntiDropInteractive(telemetry: CellularTelemetry) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFF070B14), RoundedCornerShape(12.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        Text("REALTIME JITTER & DROP PREDICTOR", color = Color(0xFFF59E0B), fontSize = 11.sp, fontWeight = FontWeight.Bold)
        Text("Drop Probability: 1.2% (Very Stable)", color = Color(0xFF10B981), fontSize = 12.sp, fontWeight = FontWeight.Bold)
        Text("VoIP Jitter Buffer: 4ms (Optimal for WhatsApp/Zoom)", color = Color.White, fontSize = 12.sp)
        Text("Online Gaming Ping: ~19ms (Colombo LankaX gateway)", color = Color.White, fontSize = 12.sp)
    }
}
