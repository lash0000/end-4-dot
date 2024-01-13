#!/bin/bash

ISZOOM=$(hyprctl getoption -j misc:cursor_zoom_factor | jq .float)
if [ $ISZOOM = "1.00000" ] ; then
  hyprctl keyword misc:cursor_zoom_factor 3
  exit
else
  if [ $ISZOOM = "3.00000" ] ; then
    hyprctl keyword misc:cursor_zoom_factor 1
    exit
  fi
fi
