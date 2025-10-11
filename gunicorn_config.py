# Server socket configuration
bind = "0.0.0.0:10000"
backlog = 1024

# Worker processes - optimized for Render free tier
workers = 1  # Single worker to minimize memory usage
worker_class = 'sync'
worker_connections = 100
timeout = 180
keepalive = 5

# Process naming
proc_name = 'neurofarm-render'

# Logging
loglevel = 'info'
accesslog = '-'
errorlog = '-'

# SSL configuration (if needed)
# keyfile = '/path/to/keyfile'
# certfile = '/path/to/certfile'

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# Request limits
limit_request_line = 4096
limit_request_fields = 100
limit_request_field_size = 8190
max_requests = 1000
max_requests_jitter = 50

# Debugging
reload = False
reload_engine = 'auto'
spew = False

# Server hooks
def when_ready(server):
    # Called just after the server is started
    pass

def on_starting(server):
    # Called just before the master process is initialized
    pass

def on_reload(server):
    # Called before code is reloaded
    pass

def on_exit(server):
    # Called just before exiting
    pass