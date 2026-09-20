from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
  response = client.get("/")
  assert response.status_code == 200
  data = response.json()
  assert data["product"] == "SignalFusion LK"
  assert "1.4.0" in data["version"]

def test_status_endpoint():
  response = client.get("/api/v1/status")
  assert response.status_code == 200
  data = response.json()
  assert data["status"] == "Operational"
  assert "services" in data

def test_config_endpoint():
  response = client.get("/api/v1/config")
  assert response.status_code == 200
  data = response.json()
  assert "Dialog" in data["supportedOperators"]
  assert "activeNodes" in data

def test_map_tiles_endpoint():
  response = client.get("/api/v1/map")
  assert response.status_code == 200
  tiles = response.json()
  assert len(tiles) > 0
  assert tiles[0]["operator"] in ["Dialog", "SLT-Mobitel", "Airtel", "Hutch"]

def test_network_comparison_endpoint():
  response = client.get("/api/v1/network-comparison?district=Colombo&location_name=Malabe%20IT%20Hub")
  assert response.status_code == 200
  data = response.json()
  assert data["district"] == "Colombo"
  assert len(data["operators"]) == 4

def test_device_pairing_session():
  response = client.post("/api/v1/devices/pair")
  assert response.status_code == 200
  data = response.json()
  assert "pairingToken" in data
  assert "pairingCode" in data
  assert len(data["pairingCode"]) == 6
