import { useInjectedStore } from '../../context/injected/injected-provider'

export const useDeployment = () => useInjectedStore((store) => store.deployment)

export const useDeployments = () => useInjectedStore((store) => store.deployments)
