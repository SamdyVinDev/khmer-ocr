FROM node:16-slim

WORKDIR /app

# Setup python 
RUN apt update
RUN apt -y upgrade
RUN apt -y install python3
RUN apt -y install python3-pip
RUN apt -y install python3-venv
RUN apt -y install build-essential libssl-dev libffi-dev python3-dev
RUN apt -y install unzip
RUN apt -y install build-essential libssl-dev

# Setup python venv
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install All Machine Learning Dependencies
RUN pip install -U pip
RUN pip install matplotlib>=3.2.2
RUN pip install numpy>=1.18.5
RUN pip install Pillow>=7.1.2
RUN pip install PyYAML>=5.3.1
RUN pip install requests>=2.23.0
RUN pip install scipy>=1.4.1
RUN pip install tqdm>=4.41.0
RUN pip install tensorboard>=2.4.1
RUN pip install pandas>=1.1.4
RUN pip install seaborn>=0.11.0
RUN pip install thop
RUN pip install opencv-python
RUN pip install opencv-contrib-python
RUN pip install opencv-python-headless
RUN pip install opencv-contrib-python-headless
RUN pip install torch==1.8.2+cpu torchvision==0.9.2+cpu torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html

# Setup server
RUN yarn global add forever

# Copy Content
COPY . ./

# Install Node Dependencies
RUN yarn

# Build Frontend
RUN cd client && yarn build

CMD [ "yarn","start"]
