using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Managers;
using API.models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class ProfileController : CustomControllerBase
    {
        private readonly IProfileManager _profile;
        private readonly IEmailManager _email;

        public ProfileController(IEmailManager emailManager, IProfileManager profile)
        {
            _profile = profile;
            _email = emailManager;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetAll")]
        public async Task<ActionResult<ApiResult<List<Profile>>>> GetAll()
        {
            return ReturnResponse(() => _profile.GetAll());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("GetOwner")]
        public async Task<ActionResult<ApiResult<Profile>>> GetOwner()
        {
            return ReturnResponse(() => _profile.GetOwner());
        }

        [HttpPut]
        [Route("Update")]
        public async Task<ActionResult<ApiResult<Profile>>> Update([FromForm]ProfileForm profileForm)
        {
            return ReturnResponse(() =>
            {
                Document cv = null;
                Document photo = null;

                if (profileForm.Cv != null)
                {
                    cv = streamToDocument(profileForm.Cv);
                    cv.DocumentId = profileForm.DocumentId_CV;
                }
                if (profileForm.Photo != null)
                {
                    photo = streamToDocument(profileForm.Photo);
                    photo.DocumentId = profileForm.DocumentId_Photo;
                }

                Profile profile = new Profile
                {
                    Advantage = profileForm.Advantage,
                    isPrincipal = profileForm.isPrincipal,
                    PastPro = profileForm.PastPro,
                    Presentation = profileForm.Presentation,
                    Price = profileForm.Price,
                    WhyMe = profileForm.WhyMe,
                    Cv = cv,
                    Photo = photo,
                    ProfileId = profileForm.ProfileId,
                    DocumentId_CV = profileForm.DocumentId_CV,
                    DocumentId_Photo = profileForm.DocumentId_Photo
                };

                return _profile.Update(profile);
            });
        }

        private Document streamToDocument(IFormFile file)
        {
            Document document = new Document();
            byte[] bytes;

            using (var fileStream = new MemoryStream())
            {
                file.CopyTo(fileStream);
                bytes = fileStream.ToArray();
                document.DocumentBase64 = Convert.ToBase64String(bytes);
                document.Title = file.FileName;
                document.Type = file.ContentType;
                document.Created = DateTime.Today;
            }

            return document;
        }
    }
}