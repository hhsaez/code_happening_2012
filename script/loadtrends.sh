#!/bin/bash
currentDateTs=$(date -j -f "%Y-%m-%d" 2012-01-01 "+%s")
endDateTs=$(date "+%s")
offset=604800
file="../data/trends.js"

echo "var trends = {"January":[], "February":[], "March":[], "April":[], "May":[], "June":[], "July":[], "August":[], "September":[], "October":[], "November":[] ,"December":[]};" > $file

while [ "$currentDateTs" -le "$endDateTs" ]
do
  date=$(date -j -f "%s" $currentDateTs "+%Y/%m/%d")
  month=$(date -j -f "%s" $currentDateTs "+%B")
  
  echo "Fetching trends for date: " $date
  curl "http://twend.it/week/$date" | grep "var data =" | sed s/{\"legend\":{\"noColumns\":1}},// | sed s/var\ data\ =\ /trends."$month".push\(/ | sed "s/}}];/}}]\);/" >> $file
  currentDateTs=$(($currentDateTs+$offset))
done

