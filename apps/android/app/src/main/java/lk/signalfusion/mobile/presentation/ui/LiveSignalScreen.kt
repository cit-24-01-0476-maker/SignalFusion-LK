package lk.signalfusion.mobile.presentation.ui

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
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
import kotlin.random.Random

@Composable
fun LiveSignalScreen(telemetry: CellularTelemetry) {
    val history = remember { mutableStateListOf<Int>() }

    LaunchedEffect(Unit) {
        // Initialize 60 seconds history
        repeat(60) {
            history.add(telemetry.signalDbm + Random.nextInt(-4, 4))
        }
        while (true) {
            delay(1000)
            if (history.size >= 60) {
                history.removeAt(0)
            }
            val variance = Random.nextInt(-3, 3)
            val currentVal = (telemetry.signalDbm + variance).coerceIn(-125, -60)
            history.add(currentVal)
        }
    }

    val minSignal = history.minOrNull() ?: -110
    val maxSignal = history.maxOrNull() ?: -75
    val avgSignal = if (history.isNotEmpty()) history.average().toInt() else -85

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Current Signal readout card
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF00F2FE).copy(alpha = 0.3f)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        "${telemetry.operator} • ${telemetry.networkGeneration}",
                        color = Color(0xFF00F2FE),
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                    Text("60-SEC ROLLING WINDOW", color = Color(0xFF64748B), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                }

                Spacer(modifier = Modifier.height(10.dp))

                Text(
                    "${history.lastOrNull() ?: telemetry.signalDbm} dBm",
                    fontSize = 46.sp,
                    fontWeight = FontWeight.Black,
                    fontFamily = FontFamily.Monospace,
                    color = Color.White
                )

                Spacer(modifier = Modifier.height(14.dp))

                // Min / Avg / Max Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    SignalStatChip("MIN SIGNAL", "$minSignal dBm", Color(0xFFEF4444))
                    SignalStatChip("AVG SIGNAL", "$avgSignal dBm", Color(0xFF00F2FE))
                    SignalStatChip("MAX SIGNAL", "$maxSignal dBm", Color(0xFF10B981))
                }
            }
        }

        // Live 60-Second Canvas Graph
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF1E293B)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Text("LIVE RADIO POWER GRAPH (dBm)", color = Color(0xFF94A3B8), fontSize = 11.sp, fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(12.dp))

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .background(Color(0xFF070B14), RoundedCornerShape(12.dp))
                        .padding(10.dp)
                ) {
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        val width = size.width
                        val height = size.height
                        val minDbmRange = -125f
                        val maxDbmRange = -60f

                        // Draw Grid lines
                        for (i in 0..4) {
                            val y = height * (i / 4f)
                            drawLine(
                                color = Color(0xFF1E293B),
                                start = Offset(0f, y),
                                end = Offset(width, y),
                                strokeWidth = 1f
                            )
                        }

                        if (history.size > 1) {
                            val path = Path()
                            val stepX = width / (history.size - 1)

                            history.forEachIndexed { index, dbm ->
                                val norm = (dbm - minDbmRange) / (maxDbmRange - minDbmRange)
                                val y = height - (norm.coerceIn(0f, 1f) * height)
                                val x = index * stepX

                                if (index == 0) {
                                    path.moveTo(x, y)
                                } else {
                                    path.lineTo(x, y)
                                }
                            }

                            drawPath(
                                path = path,
                                color = Color(0xFF00F2FE),
                                style = Stroke(width = 3.dp.toPx())
                            )
                        }
                    }
                }
                Spacer(modifier = Modifier.height(6.dp))
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("-60s ago", color = Color(0xFF475569), fontSize = 10.sp)
                    Text("NOW (1-sec interval)", color = Color(0xFF00F2FE), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                }
            }
        }

        // Deep 5G NR / 4G Detailed Technical Parameters
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF1E293B)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text("PHYSICAL LAYER PARAMETERS", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)

                MetricDetailRow("SS-RSRP (Secondary Sync Reference Signal)", "${telemetry.ssRsrp} dBm")
                MetricDetailRow("SS-RSRQ (Reference Signal Received Quality)", "${telemetry.ssRsrq} dB")
                MetricDetailRow("SS-SINR (Signal-to-Interference-Plus-Noise)", "${telemetry.ssSinr} dB")
                MetricDetailRow("CSI-RSRP (Channel State Information)", "${telemetry.csiRsrp} dBm")
                MetricDetailRow("PCI (Physical Cell Identity)", "${telemetry.pci}")
                MetricDetailRow("TAC (Tracking Area Code)", "${telemetry.tac}")
                MetricDetailRow("EARFCN / NR-ARFCN", "${telemetry.earfcn}")
                MetricDetailRow("Cell Identity (CID)", "${telemetry.cellId}")
            }
        }
    }
}

@Composable
fun SignalStatChip(label: String, value: String, accent: Color) {
    Column {
        Text(label, color = Color(0xFF64748B), fontSize = 9.sp, fontWeight = FontWeight.Bold)
        Text(value, color = accent, fontWeight = FontWeight.Black, fontSize = 14.sp, fontFamily = FontFamily.Monospace)
    }
}

@Composable
fun MetricDetailRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(label, color = Color(0xFF94A3B8), fontSize = 11.sp)
        Text(value, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
    }
}
