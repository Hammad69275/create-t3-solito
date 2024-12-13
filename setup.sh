# Define an array of directories to check for .env.example files
directories=(
    "apps/expo"
    "apps/nextjs"
    "apps/express"
    "packages/prisma"
)

# Function to check if Docker is running
check_docker_running() {
    if [[ "$(uname -s)" == "Linux" ]]; then
        if ! systemctl is-active --quiet docker; then
            echo "Docker is not running. Please start Docker and try again."
            exit 1
        fi
    elif [[ "$(uname -s)" == "MINGW"* || "$(uname -s)" == "CYGWIN"* || "$(uname -s)" == "MSYS"* ]]; then
        if ! docker info > /dev/null 2>&1; then
            echo "Docker is not running. Please start Docker Desktop and try again."
            exit 1
        fi
    else
        echo "Unsupported OS. This script works on Linux and Windows only."
        exit 1
    fi
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker daemon is running
check_docker_running

# Bring up the Docker Compose services
echo "Docker is installed and running. Bringing up services with docker-compose."
docker-compose up -d

for dir in "${directories[@]}"; do
    if [[ -f "$dir/.env.example" ]]; then
        echo "Found .env.example in $dir"
        cp "$dir/.env.example" "$dir/.env"
        echo "Copied .env.example to .env in $dir"
    else
        echo "No .env.example file found in $dir"
    fi
done

echo "Environment setup script completed."
