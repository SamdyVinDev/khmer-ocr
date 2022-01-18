FROM node:16-slim

WORKDIR /app

# Setup python 
RUN apt update
RUN apt -y upgrade
RUN apt -y install python3
RUN apt -y install python3-pip
RUN apt -y install build-essential libssl-dev libffi-dev python3-dev
RUN apt -y install unzip
RUN apt -y install build-essential libssl-dev
# RUN apt -y install snapd
# RUN snap install cmake

# Install OpenCV
RUN apt -y install python3-opencv
# RUN mkdir opencv
# RUN cd opencv
# RUN apt -y install libtiff5-dev
# RUN apt -y install libavcodec-dev libavformat-dev libswscale-dev libdc1394-22-dev
# RUN apt -y install libxine2-dev libv4l-dev
# RUN apt -y install libgstreamer0.10-dev libgstreamer-plugins-base0.10-dev
# RUN apt -y install qt5-default libgtk2.0-dev libtbb-dev
# RUN apt -y install libatlas-base-dev
# RUN apt -y install libfaac-dev libmp3lame-dev libtheora-dev
# RUN apt -y install libvorbis-dev libxvidcore-dev
# RUN apt -y install libopencore-amrnb-dev libopencore-amrwb-dev
# RUN apt -y install x264 v4l-utils
# RUN apt install -y gcc-5 g++-5
# RUN apt -y install libprotobuf-dev protobuf-compiler
# RUN apt -y install libgoogle-glog-dev libgflags-dev
# RUN apt -y install libgphoto2-dev libeigen3-dev libhdf5-dev doxygen
# RUN wget https://github.com/opencv/opencv/archive/3.3.1.zip -O opencv-3.3.1.zip
# RUN unzip opencv-3.3.1.zip
# RUN wget https://github.com/opencv/opencv_contrib/archive/3.3.1.zip -O opencvcontrib-3.3.1.zip
# RUN unzip opencvcontrib-3.3.1.zip
# RUN cd opencv-3.3.1
# RUN mkdir release
# RUN cd release
# RUN export CC=/usr/bin/gcc-5
# RUN export CXX=/usr/bin/g++-5
# RUN cmake -D CMAKEBUILDTYPE=RELEASE -D CMAKEINSTALLPREFIX=/usr/local -D INSTALLCEXAMPLES=ON -D INSTALLPYTHONEXAMPLES=ON -D WITHTBB=ON -D WITHV4L=ON -D WITHQT=ON -D WITHOPENGL=ON -D OPENCVEXTRAMODULESPATH=../../opencvcontrib-3.3.1/modules -D BUILD_EXAMPLES=ON ..
# RUN make “-j$(nproc)”
# RUN make install
# RUN sh -c ‘echo “/usr/local/lib” >> /etc/ld.so.conf.d/opencv.conf’
# RUN ldconfig
# RUN cd ..

# Install All Machine Learning Dependencies
RUN python3 -m pip install -U pip
RUN python3 -m pip install matplotlib>=3.2.2
RUN python3 -m pip install numpy>=1.18.5
RUN python3 -m pip install Pillow>=7.1.2
RUN python3 -m pip install PyYAML>=5.3.1
RUN python3 -m pip install requests>=2.23.0
RUN python3 -m pip install scipy>=1.4.1
RUN python3 -m pip install tqdm>=4.41.0
RUN python3 -m pip install tensorboard>=2.4.1
RUN python3 -m pip install pandas>=1.1.4
RUN python3 -m pip install seaborn>=0.11.0
RUN python3 -m pip install thop
RUN python3 -m pip install torch==1.8.2+cpu torchvision==0.9.2+cpu torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html

# Setup server
RUN yarn global add forever

# Copy Content
COPY . ./

# Install Node Dependencies
RUN yarn

# Start Backend
RUN forever start server/index.js

# Start Frontend
RUN cd client && yarn build

CMD ["yarn","start"]