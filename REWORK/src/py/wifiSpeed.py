import speedtest  

st = speedtest.SpeedTest()
download = st.download()

print('download: ' + str(download))