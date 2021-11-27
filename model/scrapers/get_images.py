from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get('https://images.google.com/')
box = driver.find_element_by_xpath('//*[@id="sbtc"]/div/div[2]/input')
box.send_keys('person wearing mask')
box.send_keys(Keys.ENTER)
last_height = driver.execute_script('return document.body.scrollHeight')
while True:
    driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
    time.sleep(2)
    new_height = driver.execute_script('return document.body.scrollHeight')
    try:
        driver.find_element_by_xpath('//*[@id="islmp"]/div/div/div/div/div[5]/input').click()
        time.sleep(2)
    except:
        pass
    if new_height == last_height:
        break
    last_height = new_height

for i in range(1,100):
    try:
        driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div['+str(i)+']/a[1]/div[1]/img').screenshot('/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/train/mask/ ('+str(i)+').png')
    except:
        pass


driver.get('https://images.google.com/')
box = driver.find_element_by_xpath('//*[@id="sbtc"]/div/div[2]/input')
box.send_keys('person')
box.send_keys(Keys.ENTER)
last_height = driver.execute_script('return document.body.scrollHeight')
while True:
    driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
    time.sleep(2)
    new_height = driver.execute_script('return document.body.scrollHeight')
    try:
        driver.find_element_by_xpath('//*[@id="islmp"]/div/div/div/div/div[5]/input').click()
        time.sleep(2)
    except:
        pass
    if new_height == last_height:
        break
    last_height = new_height

for i in range(1,100):
    try:
        driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div['+str(i)+']/a[1]/div[1]/img').screenshot('/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/train/no_mask/ ('+str(i)+').png')
    except:
        pass


# driver.get('https://images.google.com/')
# box = driver.find_element_by_xpath('//*[@id="sbtc"]/div/div[2]/input')
# box.send_keys('hand sanitizing station in buildings')
# box.send_keys(Keys.ENTER)
# last_height = driver.execute_script('return document.body.scrollHeight')
# while True:
#     driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
#     time.sleep(2)
#     new_height = driver.execute_script('return document.body.scrollHeight')
#     try:
#         driver.find_element_by_xpath('//*[@id="islmp"]/div/div/div/div/div[5]/input').click()
#         time.sleep(2)
#     except:
#         pass
#     if new_height == last_height:
#         break
#     last_height = new_height

# for i in range(1,100):
#     try:
#         driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div['+str(i)+']/a[1]/div[1]/img').screenshot('/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/train/hand_sanitizer/no_hand_sanitizer/ ('+str(i)+').png')
#     except:
#         pass

# driver.get('https://images.google.com/')
# box = driver.find_element_by_xpath('//*[@id="sbtc"]/div/div[2]/input')    
# box.send_keys('people using hand sanitizer')
# box.send_keys(Keys.ENTER)
# last_height = driver.execute_script('return document.body.scrollHeight')
# while True:
#     driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
#     time.sleep(2)
#     new_height = driver.execute_script('return document.body.scrollHeight')
#     try:
#         driver.find_element_by_xpath('//*[@id="islmp"]/div/div/div/div/div[5]/input').click()
#         time.sleep(2)
#     except:
#         pass
#     if new_height == last_height:
#         break
#     last_height = new_height

# for i in range(1,100):
#     try:
#         driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div['+str(i)+']/a[1]/div[1]/img').screenshot('/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/train/hand_sanitizer/yes_hand_sanitizer/ ('+str(i)+').png')
#     except:
#         pass