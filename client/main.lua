Citizen.CreateThread(function()
    Wait(500)
    SendNUIMessage({
        action = "config",
        defaultPosition = Config.defaultPosition,
        defaultDuration = Config.defaultDuration,
        lang = Config.Lang,
    })
end)

--- Send a notification to the NUI
--- @param message string
--- @param type string
--- @param duration number
NewNotification = function (message, type, duration)
    SendNUIMessage({
        action = "notification",
        text = message,
        type = type,
        duration = duration
    })
end

exports('NewNotification', NewNotification)

if Config.userCustomize then
    --- Open the customization menu
    OpenCustomizationMenu = function ()
        SetNuiFocus(true, true)
        SendNUIMessage({ action = "openCustomization" })
    end

    RegisterNuiCallback("close", function (data, cb)
        SetNuiFocus(false, false)
        cb("ok")
    end)

    RegisterCommand(Config.CustomizationCommand, OpenCustomizationMenu, false)
    RegisterKeyMapping(Config.CustomizationCommand, Config.Lang["menu-description"], "", "")
    TriggerEvent("chat:addSuggestion", "/"..Config.CustomizationCommand, Config.Lang["menu-description"])
end