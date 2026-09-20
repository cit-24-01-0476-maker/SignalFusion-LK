package lk.signalfusion.mobile.presentation.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import lk.signalfusion.mobile.domain.model.CellularTelemetry

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SignalFusionAppTheme {
                MainAppNavigation()
            }
        }
    }
}

@Composable
fun SignalFusionAppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            background = Color(0xFF060913),
            surface = Color(0xFF0B1224),
            primary = Color(0xFF00F2FE),
            secondary = Color(0xFF2563EB)
        ),
        content = content
    )
}

enum class NavigationTab(val label: String) {
    HOME("HOME"),
    MAP("MAP"),
    TEST("TEST"),
    SIGNAL("SIGNAL"),
    TOOLS("TOOLS")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppNavigation() {
    var selectedTab by remember { mutableStateOf(NavigationTab.HOME) }
    var showPairingModal by remember { mutableStateOf(false) }

    val telemetry by remember {
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
                cellId = 4130289,
                latencyMs = 18,
                jitterMs = 2,
                downloadSpeedMbps = 156.4,
                uploadSpeedMbps = 52.8,
                healthScore = 96
            )
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(end = 16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                "SignalFusion LK",
                                fontWeight = FontWeight.Black,
                                fontSize = 18.sp,
                                color = Color.White
                            )
                            Text(
                                "Smarter Signal. Stable Internet.",
                                color = Color(0xFF64748B),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }

                        IconButton(onClick = { showPairingModal = true }) {
                            Icon(
                                Icons.Default.Share,
                                contentDescription = "Web Companion QR",
                                tint = Color(0xFF00F2FE)
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF060913))
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xFF0B1224),
                contentColor = Color.White
            ) {
                NavigationTab.values().forEach { tab ->
                    NavigationBarItem(
                        selected = selectedTab == tab,
                        onClick = { selectedTab = tab },
                        icon = {
                            Icon(
                                when (tab) {
                                    NavigationTab.HOME -> Icons.Default.Home
                                    NavigationTab.MAP -> Icons.Default.LocationOn
                                    NavigationTab.TEST -> Icons.Default.PlayArrow
                                    NavigationTab.SIGNAL -> Icons.Default.Star
                                    NavigationTab.TOOLS -> Icons.Default.Build
                                },
                                contentDescription = tab.label
                            )
                        },
                        label = {
                            Text(
                                tab.label,
                                fontSize = 10.sp,
                                fontWeight = if (selectedTab == tab) FontWeight.Black else FontWeight.Normal
                            )
                        },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF00F2FE),
                            selectedTextColor = Color(0xFF00F2FE),
                            indicatorColor = Color(0xFF00F2FE).copy(alpha = 0.15f),
                            unselectedIconColor = Color(0xFF64748B),
                            unselectedTextColor = Color(0xFF64748B)
                        )
                    )
                }
            }
        },
        containerColor = Color(0xFF060913)
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when (selectedTab) {
                NavigationTab.HOME -> HomeScreen(
                    telemetry = telemetry,
                    onNavigateToTest = { selectedTab = NavigationTab.TEST },
                    onNavigateToSignal = { selectedTab = NavigationTab.SIGNAL },
                    onNavigateToPairing = { showPairingModal = true }
                )
                NavigationTab.MAP -> MapScreen(telemetry = telemetry)
                NavigationTab.TEST -> SpeedTestScreen(telemetry = telemetry)
                NavigationTab.SIGNAL -> LiveSignalScreen(telemetry = telemetry)
                NavigationTab.TOOLS -> ToolsScreen(
                    telemetry = telemetry,
                    onNavigateToPairing = { showPairingModal = true }
                )
            }

            // Web Companion Pairing Dialog
            if (showPairingModal) {
                AlertDialog(
                    onDismissRequest = { showPairingModal = false },
                    confirmButton = {
                        Button(
                            onClick = { showPairingModal = false },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                        ) {
                            Text("DONE", fontWeight = FontWeight.Bold)
                        }
                    },
                    title = {
                        Text("Web Companion Sync", color = Color.White, fontWeight = FontWeight.Black)
                    },
                    text = {
                        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text(
                                "Your phone will stream real 5G NR / 4G LTE radio parameters directly to your web browser dashboard.",
                                color = Color(0xFF94A3B8),
                                fontSize = 12.sp
                            )
                            Card(
                                shape = RoundedCornerShape(10.dp),
                                colors = CardDefaults.cardColors(containerColor = Color(0xFF070B14)),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Column(
                                    modifier = Modifier.padding(14.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Text("PAIRING TOKEN / CODE", color = Color(0xFF64748B), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text("LK-8894", color = Color(0xFF00F2FE), fontSize = 28.sp, fontWeight = FontWeight.Black)
                                    Text("Enter on signalfusion.lk/dashboard", color = Color(0xFF94A3B8), fontSize = 11.sp)
                                }
                            }
                        }
                    },
                    containerColor = Color(0xFF0B1224)
                )
            }
        }
    }
}
