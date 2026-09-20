import math
from typing import Tuple, Dict, Any

# Sri Lanka approximate bounding box
SL_MIN_LAT = 5.8
SL_MAX_LAT = 9.9
SL_MIN_LON = 79.5
SL_MAX_LON = 82.0

def convert_to_privacy_grid(lat: float, lon: float, precision: int = 2) -> str:
  """Converts exact GPS to ~1.1km privacy-preserving spatial grid key."""
  grid_lat = round(lat, precision)
  grid_lon = round(lon, precision)
  return f"LK_GRID_{grid_lat:.2f}_{grid_lon:.2f}"

def validate_measurement(data: Dict[str, Any]) -> Tuple[bool, str, str]:
  """
  Validates incoming measurement for plausibility, fraud, and bounding box.
  Returns: (is_valid, verification_status, confidence_score)
  """
  lat = data.get("latitude", 0.0)
  lon = data.get("longitude", 0.0)

  # Check Sri Lanka territorial bounds
  if not (SL_MIN_LAT <= lat <= SL_MAX_LAT and SL_MIN_LON <= lon <= SL_MAX_LON):
    return False, "rejected_out_of_bounds", "LOW CONFIDENCE"

  # Plausibility checks
  download = data.get("download_mbps")
  network_type = data.get("network_type", "")
  if download is not None:
    if download < 0:
      return False, "rejected_negative_throughput", "LOW CONFIDENCE"
    # Physical radio plausibility
    if network_type == "3G" and download > 50:
      return True, "flagged_high_3g_speed", "LOW CONFIDENCE"
    if network_type == "4G" and download > 600:
      return True, "flagged_outlier_4g_speed", "MEDIUM CONFIDENCE"

  signal_dbm = data.get("signal_dbm")
  if signal_dbm is not None:
    if signal_dbm > -30 or signal_dbm < -145:
      return False, "rejected_implausible_signal_dbm", "LOW CONFIDENCE"

  source = data.get("measurement_source", "web_speedtest")
  if source == "android_native":
    confidence = "HIGH CONFIDENCE"
  elif source in ("desktop_native", "web_companion"):
    confidence = "MEDIUM CONFIDENCE"
  else:
    confidence = "MEDIUM CONFIDENCE"

  return True, "verified", confidence
