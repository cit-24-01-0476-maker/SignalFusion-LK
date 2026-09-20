package lk.signalfusion.mobile.presentation.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import lk.signalfusion.mobile.domain.model.CellularTelemetry

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SignalFusionAppTheme {
                MainDashboardScreen()
            }
        }
    }
}

@Composable
fun SignalFusionAppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            background = Color(0xFF070B14),
            surface = Color(0xFF0D1527),
            primary = Color(0xFF00F2FE),
            secondary = Color(0xFF2563EB)
        ),
        content = content
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainDashboardScreen() {
    var telemetry by remember {
        mutableStateOf(
            CellularTelemetry(
                operator = "Dialog",
                mnc = "02",
                networkGeneration = "5G NR",
                signalDbm = -83,
                ssRsrp = -83,
                ssRsrq = -10,
                ssSinr = 19,
                pci = 246,
                tac = 5012,
                cellId = 4130289
            )
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "SignalFusion LK",
                        fontWeight = FontWeight.Black,
                        color = Color.White
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF070B14))
            )
        },
        containerColor = Color(0xFF070B14)
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Live Status Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0D1527)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            "${telemetry.operator} • ${telemetry.networkGeneration}",
                            color = Color(0xFF00F2FE),
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp
                        )
                        Text(
                            "LIVE",
                            color = Color(0xFF10B981),
                            fontWeight = FontWeight.Black,
                            fontSize = 12.sp,
                            modifier = Modifier
                                .background(Color(0xFF064E3B), RoundedCornerShape(4.dp))
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        "${telemetry.signalDbm} dBm",
                        fontSize = 42.sp,
                        fontWeight = FontWeight.Black,
                        fontFamily = FontFamily.Monospace,
                        color = Color.White
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        MetricSmall("SS-RSRP", "${telemetry.ssRsrp} dBm")
                        MetricSmall("SS-RSRQ", "${telemetry.ssRsrq} dB")
                        MetricSmall("SS-SINR", "${telemetry.ssSinr} dB")
                    }
                }
            }

            // Cell Identity Card
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1222)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text("Cell ID (CID)", color = Color.Gray, fontSize = 11.sp)
                        Text("${telemetry.cellId}", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                    Column {
                        Text("Physical Cell (PCI)", color = Color.Gray, fontSize = 11.sp)
                        Text("${telemetry.pci}", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                    Column {
                        Text("Tracking Area (TAC)", color = Color.Gray, fontSize = 11.sp)
                        Text("${telemetry.tac}", color = Color.White, fontWeight = FontWeight.Bold)
                    }
                }
            }

            // Action Buttons
            Button(
                onClick = { /* Launch real speed test */ },
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("RUN SRI LANKA SPEED TEST", fontWeight = FontWeight.Bold)
            }

            OutlinedButton(
                onClick = { /* Scan web pairing QR */ },
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("PAIR WITH WEB COMPANION", color = Color(0xFF00F2FE))
            }
        }
    }
}

@Composable
fun MetricSmall(label: String, value: String) {
    Column {
        Text(label, color = Color.Gray, fontSize = 10.sp, fontFamily = FontFamily.Monospace)
        Text(value, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}
