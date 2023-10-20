import { ToastPosition, toast } from "@backpackapp-io/react-native-toast"
import {
  NetInfoCellularGeneration,
  NetInfoStateType,
  useNetInfo,
} from "@react-native-community/netinfo"
import { useEffect } from "react"

/**
 * Use to show toast (in app notifications), when
 * 1. there is no connection or
 * 2. there is cellular connection and it's weaker than 4g
 */
export function useConnectionStatus() {
  const net = useNetInfo()

  useEffect(() => {
    if (net.isInternetReachable === false) {
      toast.error("There is no internet connection", {
        duration: 5000, // 5s
        position: ToastPosition.BOTTOM,
      })
    }

    if (net.type === NetInfoStateType.cellular) {
      const cellularGeneration = net.details.cellularGeneration

      if (
        cellularGeneration === NetInfoCellularGeneration["2g"] ||
        cellularGeneration === NetInfoCellularGeneration["3g"]
      )
        toast.error("Slow internet connection", {
          duration: 5000, // 5s
          position: ToastPosition.BOTTOM,
        })
    }
  }, [
    net.isInternetReachable,
    net.type,
    net.type === NetInfoStateType.cellular && net.details?.cellularGeneration,
  ])
}

