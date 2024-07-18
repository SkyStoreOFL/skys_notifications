fx_version "cerulean"
game "gta5"

author "Cocodrulo"
version "1.0.0"
description "Notification script compatible with any Framework"

ui_page "html/index.html"

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

shared_scripts {
    'Config.lua'
}

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}
