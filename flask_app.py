from flask import Flask, jsonify
from flask_cors import CORS
from source.logger_backend import LoggerBackend
import threading

app = Flask(__name__)
CORS(app)
logger_backend = LoggerBackend(debugging=False, log_raw_data=False)

@app.route('/api/game-state')
def get_game_state_str():
    game_state_str = logger_backend.get_game_state_str()
    # Remove "Race Logger" prefix from the string
    game_state_str = game_state_str.replace("Race Logger ", "")
    game_state_str = game_state_str.replace("|----------------| ", "")
    key_value_pairs = [pair.strip() for pair in game_state_str.split(',')]
    game_state_dict = {}

    for pair in key_value_pairs:
        if ':' in pair:
            key, value = pair.split(':', 1)
            game_state_dict[key.strip()] = value.strip()

    return jsonify(game_state_dict)


def run_flask_app():
    app.run()

def main():
    flask_thread = threading.Thread(target=run_flask_app)
    flask_thread.start()
    logger_backend.start_logging()
    try:
        while True:
            logger_backend.check_udp_messages()
    except KeyboardInterrupt:
        # Handle Ctrl+C to gracefully shut down the server
        print("Exiting program...")
    finally:
        flask_thread.join()  # Wait for Flask thread to finish

if __name__ == '__main__':
    main()
