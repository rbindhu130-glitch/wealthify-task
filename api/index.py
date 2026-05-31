import os
import sys

# Add the backend folder to the sys.path so the 'app' module can be found
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.main import app
