Config = Config or {}

POSITIONS = {
    TOP_LEFT = 1,
    TOP_CENTER = 2,
    TOP_RIGHT = 3,
    MIDDLE_LEFT = 4,
    MIDDLE_RIGHT = 5,
    BOTTOM_LEFT = 6,
    BOTTOM_CENTER = 7,
    BOTTOM_RIGHT = 8
}

Config.defaultDuration = 5000
Config.defaultPosition = POSITIONS.MIDDLE_RIGHT
Config.userCustomize = true
Config.CustomizationCommand = "notifymenu"

Config.Lang = {
    ["test-notification"] = "Esto es una notifición de prueba",
    ["menu-description"] = "Abre el menú de personalización de notificaciones",
    ["html"] = {
        ["title"] = "Posición de Notificacions",
        ["positions"] = {
            [POSITIONS.TOP_LEFT] = "Arriba a la Izquierda",
            [POSITIONS.TOP_CENTER] = "Arriba al Centro",
            [POSITIONS.TOP_RIGHT] = "Arriba a la Derecha",
            [POSITIONS.MIDDLE_LEFT] = "Medio a la Izquierda",
            [POSITIONS.MIDDLE_RIGHT] = "Medio a la Derecha",
            [POSITIONS.BOTTOM_LEFT] = "Abajo a la Izquierda",
            [POSITIONS.BOTTOM_CENTER] = "Abajo al Centro",
            [POSITIONS.BOTTOM_RIGHT] = "Abajo a la Derecha"
        },
        ["test-title"] = "Probar Notificación",
        ["test-buttons"] = {
            ["success"] = "Éxito",
            ["error"] = "Error",
            ["warning"] = "Advertencia",
            ["info"] = "Información"
        },
    }
}