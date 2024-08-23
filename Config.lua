Config = Config or {}

POSITIONS = { -- You shoulnd't change this
    TOP_LEFT = "1",
    TOP_CENTER = "2",
    TOP_RIGHT = "3",
    MIDDLE_LEFT = "4",
    MIDDLE_RIGHT = "5",
    BOTTOM_LEFT = "6",
    BOTTOM_CENTER = "7",
    BOTTOM_RIGHT = "8"
}

Config.defaultDuration = 5000 -- Default duration of notifications
Config.defaultPosition = POSITIONS.MIDDLE_RIGHT -- Default position of notifications
Config.userCustomize = true -- To enable customizing menu
Config.CustomizationCommand = "notifymenu" -- Command to open customazing menu (above must be enabled)

Config.Lang = { -- Change strings of the NUI and other parts of the script
    ["test-notification"] = "Esto es una notificación de prueba",
    ["menu-description"] = "Abre el menú de personalización de notificaciones",
    ["html"] = {
        ["title"] = "Posición de Notificacions",
        ["sounds-title"] = "Ajustes de Sonido:",
        ["sound-button"] = {
            ["enable"] = "Activar Sonido",
            ["disable"] = "Desactivar Sonido"
        },
        ["positions"] = {
            [POSITIONS.TOP_LEFT] = "Arriba Izquierda",
            [POSITIONS.TOP_CENTER] = "Arriba Centro",
            [POSITIONS.TOP_RIGHT] = "Arriba Derecha",
            [POSITIONS.MIDDLE_LEFT] = "Medio Izquierda",
            [POSITIONS.MIDDLE_RIGHT] = "Medio Derecha",
            [POSITIONS.BOTTOM_LEFT] = "Abajo Izquierda",
            [POSITIONS.BOTTOM_CENTER] = "Abajo Centro",
            [POSITIONS.BOTTOM_RIGHT] = "Abajo Derecha"
        },
        ["test-title"] = "Probar Notificación",
        ["test-buttons"] = {
            ["success"] = "Éxito",
            ["error"] = "Error",
            ["warning"] = "Advertencia",
            ["info"] = "Información",
            ["bank"] = "Banco"
        },
    }
}
