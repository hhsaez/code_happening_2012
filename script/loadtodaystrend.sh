#!/bin/bash

date=$(date "+%Y/%m/%d")
month=$(date "+%B")
file="../data/trends.js"
  
echo "Fetching trends for date: " $date
curl "http://twend.it/day/$date" | grep "var data =" | sed s/{\"legend\":{\"noColumns\":1}},// | sed s/var\ data\ =\ /trends."$month".push\(/ | sed "s/}}];/}}]\);/" >> $file

