#!/bin/bash
cmd_path=$(dirname $0)
cd $cmd_path
tns prepare android

# delete values-zh-CN path, otherwise, tns build will report Error: Invalid resource directory name
zh_cn_path="$cmd_path/platforms/android/src/main/res/values-zh-CN"
if [ -e "$zh_cn_path" ]
then
    rm -rf "$zh_cn_path"
    echo "delete path: [$zh_cn_path]"
fi

# delete values-zh-CN path, otherwise, tns build will report Error: Invalid resource directory name
zh_cn_path="$cmd_path/platforms/android/src/main/res/values-zh_CN"
if [ -e "$zh_cn_path" ]
then
    rm -rf "$zh_cn_path"
    echo "delete path: [$zh_cn_path]"
fi

tns build android