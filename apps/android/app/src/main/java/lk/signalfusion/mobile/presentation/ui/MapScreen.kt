package lk.signalfusion.mobile.presentation.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import lk.signalfusion.mobile.domain.model.CellularTelemetry

data class DistrictCoverage(
    val district: String,
    val dialogCoverage: String,
    val mobitelCoverage: String,
    val airtelCoverage: String,
    val hutchCoverage: String,
    val avgSpeedMbps: Double,
    val has5G: Boolean,
    val confidence: String
)

@Composable
fun MapScreen(telemetry: CellularTelemetry) {
    var selectedLayer by remember { mutableStateOf("ALL") } // ALL, 5G, 4G
    var selectedOperator by remember { mutableStateOf("ALL") } // ALL, Dialog, Mobitel, Airtel, Hutch

    val districts = remember {
        listOf(
            DistrictCoverage("Colombo", "5G NR (98%)", "5G NR (94%)", "4G LTE (91%)", "4G LTE (88%)", 154.2, true, "99.4%"),
            DistrictCoverage("Gampaha", "5G NR (89%)", "4G LTE (92%)", "4G LTE (88%)", "4G LTE (84%)", 88.4, true, "98.1%"),
            DistrictCoverage("Kalutara", "4G LTE (91%)", "4G LTE (90%)", "4G LTE (85%)", "4G LTE (82%)", 64.1, false, "97.5%"),
            DistrictCoverage("Kandy", "5G NR (92%)", "4G LTE (89%)", "4G LTE (86%)", "4G LTE (81%)", 95.8, true, "98.7%"),
            DistrictCoverage("Galle", "5G NR (87%)", "4G LTE (91%)", "4G LTE (84%)", "4G LTE (80%)", 76.5, true, "96.9%"),
            DistrictCoverage("Matara", "4G LTE (90%)", "4G LTE (88%)", "4G LTE (82%)", "4G LTE (79%)", 58.2, false, "95.4%"),
            DistrictCoverage("Jaffna", "5G NR (85%)", "4G LTE (86%)", "4G LTE (80%)", "4G LTE (78%)", 72.0, true, "96.2%"),
            DistrictCoverage("Kurunegala", "4G LTE (89%)", "4G LTE (87%)", "4G LTE (83%)", "4G LTE (77%)", 54.8, false, "95.1%"),
            DistrictCoverage("Anuradhapura", "4G LTE (85%)", "4G LTE (84%)", "4G LTE (79%)", "4G LTE (74%)", 48.6, false, "94.0%"),
            DistrictCoverage("Badulla", "4G LTE (82%)", "4G LTE (81%)", "4G LTE (75%)", "4G LTE (71%)", 42.1, false, "93.2%")
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Filter Row (All, 5G NR, 4G LTE)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("ALL", "5G NR", "4G LTE").forEach { layer ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (selectedLayer == layer) Color(0xFF2563EB) else Color(0xFF0B1224))
                        .clickable { selectedLayer = layer }
                        .padding(vertical = 10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        layer,
                        color = if (selectedLayer == layer) Color.White else Color(0xFF94A3B8),
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp
                    )
                }
            }
        }

        // Live Crowdsourced Status Bar
        Card(
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF1E293B)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.fillMaxWidth().padding(14.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("SRI LANKA COVERAGE ENGINE", color = Color(0xFF64748B), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("25 Districts • 14,820 Crowdsourced Points", color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
                Text("UPDATED", color = Color(0xFF10B981), fontSize = 10.sp, fontWeight = FontWeight.Black)
            }
        }

        // Districts List
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            val filtered = districts.filter {
                if (selectedLayer == "5G NR") it.has5G else true
            }

            items(filtered) { item ->
                DistrictItemCard(item)
            }
        }
    }
}

@Composable
fun DistrictItemCard(item: DistrictCoverage) {
    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF0B1224)),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF1E293B)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(item.district, color = Color.White, fontWeight = FontWeight.Black, fontSize = 16.sp)
                if (item.has5G) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(Color(0xFF00F2FE).copy(alpha = 0.15f))
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text("5G ACTIVE", color = Color(0xFF00F2FE), fontSize = 9.sp, fontWeight = FontWeight.Black)
                    }
                }
            }

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Dialog: ${item.dialogCoverage}", color = Color(0xFFEF4444), fontSize = 11.sp, fontWeight = FontWeight.Medium)
                Text("Mobitel: ${item.mobitelCoverage}", color = Color(0xFF10B981), fontSize = 11.sp, fontWeight = FontWeight.Medium)
            }

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("Airtel: ${item.airtelCoverage}", color = Color(0xFFF59E0B), fontSize = 11.sp, fontWeight = FontWeight.Medium)
                Text("Hutch: ${item.hutchCoverage}", color = Color(0xFFFB923C), fontSize = 11.sp, fontWeight = FontWeight.Medium)
            }

            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Avg Speed: ${item.avgSpeedMbps} Mbps", color = Color(0xFF94A3B8), fontSize = 11.sp, fontFamily = FontFamily.Monospace)
                Text("Confidence: ${item.confidence}", color = Color(0xFF64748B), fontSize = 10.sp)
            }
        }
    }
}
