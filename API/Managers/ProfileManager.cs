using DataAccess.CRUD;
using DataAccess.Entities;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public interface IProfileManager
    {
        Task<List<Profile>> GetAll();
        Task<Profile> GetOwner();
    }
    public class ProfileManager : IProfileManager
    {
        private readonly ProfileAccess _profileAccess;
        private readonly DocumentAccess _documentAccess;

        public ProfileManager(ProfileAccess profileAccess, DocumentAccess documentAccess) {
            _profileAccess = profileAccess;
            _documentAccess = documentAccess;
        }

        public async Task<List<Profile>> GetAll()
        {
            var profiles = await _profileAccess.GetAll();
            var documents = await _documentAccess.GetAll();

            profiles.ForEach((profile)=> {
                profile.Cv = documents.Find(g => g.DocumentId == profile.DocumentId_CV);
                profile.Photo = documents.Find(g => g.DocumentId == profile.DocumentId_Photo);
            });

            return profiles;
        }
        public async Task<Profile> GetOwner()
        {
            var profile = await _profileAccess.GetByCondition<Profile>("isPrincipal=1");
            var documents = await _documentAccess.GetAll();

            profile.ForEach((profile) => {
                profile.Cv = documents.Find(g => g.DocumentId == profile.DocumentId_CV);
                profile.Photo = documents.Find(g => g.DocumentId == profile.DocumentId_Photo);
            });

            return profile.FirstOrDefault();
        }
    }
}
