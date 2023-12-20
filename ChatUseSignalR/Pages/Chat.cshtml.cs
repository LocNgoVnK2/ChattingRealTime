
using Infrastructure.Enities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ChatUseSignalR.Pages
{
    [Authorize]
    public class ChatModel : PageModel
    {
    
        private readonly ILogger<ChatModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;

        public ChatModel(ILogger<ChatModel> logger, UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        public async Task<IActionResult> OnGet()
        {

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            ViewData["UserName"] = user.UserName;
            return Page();
        }
    }
}
