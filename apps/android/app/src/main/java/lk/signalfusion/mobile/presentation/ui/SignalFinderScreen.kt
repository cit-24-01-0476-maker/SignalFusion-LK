package lk.signalfusion.mobile.presentation.ui

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun SignalFinderScreen(
    currentDbm: Int = -84,
    bestDbm: Int = -79,
    headingDeg: Float = 114f,
    operatorName: String = "Dialog 5G NR"
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF070B14))
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        // Header
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                "SIGNAL FINDER",
                color = Color(0xFF00F2FE),
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 2.sp
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                operatorName,
                color = Color.White,
                fontSize = 18.sp,
                fontWeight = FontWeight.Black
            )
        }

        // Compass Graphic
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.size(260.dp)
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val center = Offset(size.width / 2, size.height / 2)
                val radius = size.width / 2 - 16.dp.toPx()

                // Outer ring
                drawCircle(
                    color = Color(0xFF1E293B),
                    radius = radius,
                    style = androidx.compose.ui.graphics.drawscope.Stroke(width = 4.dp.toPx())
                )

                // Needle pointing along headingDeg
                val angleRad = Math.toRadians((headingDeg - 90).toDouble())
                val needleLength = radius - 20.dp.toPx()
                val needleEnd = Offset(
                    center.x + (needleLength * cos(angleRad)).toFloat(),
                    center.y + (needleLength * sin(angleRad)).toFloat()
                )

                drawLine(
                    color = Color(0xFF00F2FE),
                    start = center,
                    end = needleEnd,
                    strokeWidth = 6.dp.toPx(),
                    cap = StrokeCap.Round
                )
            }

            // Center digital heading readout
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .size(90.dp)
                    .background(Color(0xFF0D1527), CircleShape)
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("HEADING", color = Color.Gray, fontSize = 9.sp)
                    Text(
                        "${headingDeg.toInt()}°",
                        color = Color(0xFF00F2FE),
                        fontWeight = FontWeight.Black,
                        fontSize = 18.sp
                    )
                }
            }
        }

        // Gain & Stats Card
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0D1527)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Current Position", color = Color.Gray, fontSize = 12.sp)
                    Text("$currentDbm dBm", color = Color.White, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                }

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Best Recorded Spot", color = Color.Gray, fontSize = 12.sp)
                    Text("$bestDbm dBm", color = Color(0xFF10B981), fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
                }

                Divider(color = Color(0xFF1E293B))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Potential Signal Gain", color = Color.Gray, fontSize = 12.sp)
                    Text("+${bestDbm - currentDbm} dB", color = Color(0xFF00F2FE), fontWeight = FontWeight.Black, fontFamily = FontFamily.Monospace)
                }
            }
        }

        // Guidance instruction
        Text(
            "Rotate slowly toward eastern window or elevated position for line-of-sight to tower.",
            color = Color.LightGray,
            fontSize = 11.sp,
            modifier = Modifier.padding(bottom = 12.dp)
        )
    }
}
