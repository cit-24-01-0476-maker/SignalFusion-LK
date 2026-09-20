package lk.signalfusion.mobile.presentation.ui

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

@Composable
fun NetworkHealthScreen(
    healthScore: Int = 88,
    dropRisk: String = "LOW",
    isGamingMode: Boolean = false,
    isCallMode: Boolean = true
) {
    var gamingModeActive by remember { mutableStateOf(isGamingMode) }
    var callModeActive by remember { mutableStateOf(isCallMode) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF070B14))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            "NETWORK STABILITY & HEALTH",
            color = Color(0xFF00F2FE),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 2.sp
        )

        // Health Score Card
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0D1527)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("Overall Health Index", color = Color.Gray, fontSize = 12.sp)
                    Text("$healthScore%", color = Color(0xFF10B981), fontSize = 44.sp, fontWeight = FontWeight.Black, fontFamily = FontFamily.Monospace)
                    Text("Drop Risk: $dropRisk", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                }

                Box(
                    modifier = Modifier
                        .size(60.dp)
                        .background(Color(0xFF064E3B), RoundedCornerShape(12.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("OPTIMAL", color = Color(0xFF10B981), fontWeight = FontWeight.Black, fontSize = 10.sp)
                }
            }
        }

        // Stability Modes
        Text("Active Stability Profiles", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)

        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1327)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                // Call Stability Mode
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text("VoIP & Call Stability Mode", color = Color.White, fontWeight = FontWeight.Bold)
                        Text("Monitors SINR degradation to prevent sudden WhatsApp / Dialog voice call cut-offs.", color = Color.Gray, fontSize = 11.sp)
                    }
                    Switch(
                        checked = callModeActive,
                        onCheckedChange = { callModeActive = it },
                        colors = SwitchDefaults.colors(checkedThumbColor = Color(0xFF00F2FE))
                    )
                }

                Divider(color = Color(0xFF1E293B))

                // Gaming Mode
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text("Low Jitter Gaming Mode", color = Color.White, fontWeight = FontWeight.Bold)
                        Text("Paces packet transfers to minimize ping jitter and spikes.", color = Color.Gray, fontSize = 11.sp)
                    }
                    Switch(
                        checked = gamingModeActive,
                        onCheckedChange = { gamingModeActive = it },
                        colors = SwitchDefaults.colors(checkedThumbColor = Color(0xFF00F2FE))
                    )
                }
            }
        }
    }
}
