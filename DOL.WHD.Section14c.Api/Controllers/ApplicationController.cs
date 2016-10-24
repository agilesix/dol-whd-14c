﻿using System.Threading.Tasks;
using System.Web.Http;
using DOL.WHD.Section14c.Business;
using DOL.WHD.Section14c.Domain.Models.Submission;

namespace DOL.WHD.Section14c.Api.Controllers
{
    [Authorize]
    public class ApplicationController : ApiController
    {
        private readonly IIdentityService _identityService;
        private readonly IApplicationService _applicationService;
        public ApplicationController(IIdentityService identityService, IApplicationService applicationService)
        {
            _identityService = identityService;
            _applicationService = applicationService;
        }

        public async Task<IHttpActionResult> Submit(ApplicationSubmission submission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // make sure user has rights to the EIN
            var hasEINClaim = _identityService.UserHasEINClaim(User, submission.EIN);
            if (!hasEINClaim)
            {
                return Unauthorized();
            }

            await _applicationService.SubmitApplicationAsync(submission);
            return Created("", submission);
        }
    }
}