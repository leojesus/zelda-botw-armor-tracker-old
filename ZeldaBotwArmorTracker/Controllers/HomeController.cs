using Microsoft.AspNetCore.Mvc;

namespace ZeldaBotwArmorTracker.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }      
    }
}
