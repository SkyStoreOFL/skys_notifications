local sendConfig = true

CheckFirstTime = function ()
    if not sendConfig then return end
    SendNUIMessage({
        action = "config",
        defaultPosition = Config.defaultPosition,
        defaultDuration = Config.defaultDuration,
        lang = Config.Lang,
    })
    sendConfig = false
end

--- Send a notification to the NUI
--- @param message string
--- @param type string
--- @param duration number
NewNotification = function (message, type, duration, icon, title)
    CheckFirstTime()

    SendNUIMessage({
        action = "notification",
        text = message,
        type = type,
        duration = duration,
        icon = icon,
        title = title
    })
end

exports('NewNotification', NewNotification)

if Config.userCustomize then
    --- Open the customization menu
    OpenCustomizationMenu = function ()
        CheckFirstTime()
    
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
