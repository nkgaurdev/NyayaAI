import unittest

from fastapi.testclient import TestClient

from main import app


class ErrorHandlingTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_invalid_pdf_returns_error_payload(self):
        response = self.client.post(
            "/analyze-pdf",
            files={"file": ("bad.pdf", b"not-a-valid-pdf", "application/pdf")},
        )

        self.assertIn(response.status_code, (400, 422))
        payload = response.json()
        self.assertIn("detail", payload)
        self.assertIn("error", payload)


if __name__ == "__main__":
    unittest.main()
