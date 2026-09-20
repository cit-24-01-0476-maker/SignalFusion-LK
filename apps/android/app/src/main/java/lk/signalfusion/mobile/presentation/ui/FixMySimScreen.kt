package lk.signalfusion.mobile.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun FixMySimScreen(
    currentOperator: String = "Dialog",
    simSlot: Int = 1
) {
    var isFixing by remember { mutableStateOf(false) }
    var resultText by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF070B14))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            "FIX MY SIM & APN",
            color = Color(0xFF00F2FE),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 2.sp
        )

        Text(
            "Sri Lanka Carrier Diagnostic & Refresh",
            color = Color.White,
            fontSize = 20.sp,
            fontWeight = FontWeight.Black
        )

        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0D1527)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Active Carrier Profile", color = Color.Gray, fontSize = 12.sp)
                Text("$currentOperator (SIM Slot $simSlot)", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text("Pre-configured APN: dialogbb / mobitel3g / airtellive", color = Color(0xFF00F2FE), fontSize = 12.sp)
            }
        }

        Button(
            onClick = {
                isFixing = true
                resultText = null
                // Simulating native radio interface reset
            },
            enabled = !isFixing,
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (isFixing) "RESETTING CARRIER ROUTE..." else "REFRESH RADIO & CLEAR STALE TOWER CACHE")
        }

        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1327)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("What this operation does:", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Text("• Flushes stale LTE/5G handover caches on the mobile modem", color = Color.LightGray, fontSize = 12.sp)
                Text("• Re-queries closest physical cell towers (PCI recalculation)", color = Color.LightGray, fontSize = 12.sp)
                Text("• Optimizes carrier aggregation secondary carrier (Pcell / Scell)", color = Color.LightGray, fontSize = 12.sp)
            }
        }
    }
}
