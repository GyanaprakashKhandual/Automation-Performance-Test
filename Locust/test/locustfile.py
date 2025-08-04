from locust import HttpUser, task, between # type: ignore

class GoogleUser(HttpUser):
    wait_time = between(1, 2)  # Optional: wait time between requests

    @task
    def load_google(self):
        self.client.get("/")  # root path (google.com/)
