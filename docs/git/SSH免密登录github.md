## SSH 免密登录 github

查看本地是否

使用 rsa 生成公钥

```shell
ssh-keygen -t rsa -C "1982510090@qq.com"
```

回车三次

打印公钥

```shell
cat id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCY3/J701LoqxT+9CfEK3eP26/xlLKvx0Subw7yz7xFjHwsLOzzTXxvjZ4PAnVBQQzKX4n0qfORRVb7n7tGyjHVW9iFr7sONm4gXwntdILWuFi1wDqfpepRUUY/TzJyoWJPhA6SfR6bOZTe+ms1LdLTGBrqBUzy9vwWJkFd/LL/sHhhpVJdn6UN/hXDvfQN+OfPeKLTJ5PBNYW9yxeNzdrzBmPeLyIpCDqe+0/mYDW9h5IWpe4dK1DlZpVQy58A/EcPwwyaXyMKlTOf//1e3RZBraSX1Ymm6/n1uOo2xQNU0AymbH0fSmJhNPhiixR9OPZRj5+nDEkyro321cGEhseAru9qjzVAYx8QUYvyKN7Adpb/Qwe45bkz6P2Rv2IpM5RdYh5YxqbiTAjhgFWy8QA2APO3Gd3Hh0kOaUduh345WV9LNo0AQN1MJlQPD6vXQgsDtJUm2Qwz62I781Ak6rkyPUQGzc+nLEZvCoHisbuAr2F7nvF8Myyd9YXDF+/thsk= "1982510090@qq.com
```

![image-20251107200642111](/image-20251107200642111.png)

![image-20251107200335493](/image-20251107200335493.png)

![image-20251107200715180](/image-20251107200715180.png)
