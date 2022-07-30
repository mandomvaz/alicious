using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

using EFRepositoryAdapter.DataModel.Model;

namespace EFRepositoryAdapter.DTOTransformers
{
    internal static class UserTransformers
    {
        internal static UserModel ToModel(this UserDTO userDTO)
        {
            return new UserModel()
            {
                Guid = userDTO.Guid,
                Name = userDTO.Name,
                FullName = userDTO.FullName,
                Email = userDTO.Email,
                Picture = userDTO.Picture,
                Sub = userDTO.Sub,
                Timestamp = userDTO.Timestamp,
            };
        }

        internal static UserDTO ToDTO(this UserModel user)
        {
            return new UserEF()
            {
                Guid = user.Guid,
                Name = user.Name,
                FullName = user.FullName,
                Email = user.Email,
                Picture = user.Picture,
                Sub = user.Sub,
                Timestamp = user.Timestamp,
            };
        }
    }

    internal class UserEF : UserDTO
    {

    }
}
