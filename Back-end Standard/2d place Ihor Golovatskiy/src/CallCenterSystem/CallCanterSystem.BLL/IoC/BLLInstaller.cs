using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace CallCanterSystem.BLL.IoC
{
    public class BLLInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container,
                            IConfigurationStore store)
        {
            //auto-register
            container.Register(Classes.FromAssembly(GetType().Assembly)
                                      .Pick()
                                      .WithService
                                      .DefaultInterfaces()
                                      .LifestyleSingleton());
        }
    }
}