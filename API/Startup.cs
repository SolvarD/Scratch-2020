using API.enums;
using API.HubApi;
using API.Managers;
using API.Services;
using DataAccess;
using DataAccess.CRUD;
using DataAccess.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Linq;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOriginsPolicy",
                builder =>
                {
                    builder.WithOrigins("https://localhost:44359", "https://localhost:44303",
                        "https://localhost:45666", "https://localhost:443",
                        "https://solvard.ddns.net",
                        "https://solvard.ddns.net:45666",
                        "https://globaldevapp.com:45666",
                        "https://192.168.0.11",
                        "https://dsolvar.globaldevapp.com",
                        "https://www.globaldevapp.com:45666",
                        "https://www.globaldevapp.com",
                        "https://globaldevapp.com");
                    //builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                });
            });

            var key = Encoding.ASCII.GetBytes(Configuration["Authentication:SecretKey"]);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                 .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                 {
                     options.RequireHttpsMetadata = false;
                     options.SaveToken = true;
                     options.TokenValidationParameters = new TokenValidationParameters()
                     {
                         ValidateIssuerSigningKey = true,
                         IssuerSigningKey = new SymmetricSecurityKey(key),
                         ValidateIssuer = false,
                         ValidateAudience = false
                     };
                 });
            //.AddCookie("GlobalDevApp");

            //services.AddAuthentication("GlobalDevApp")
            //.AddCookie("GlobalDevApp");

            services.AddAuthorization(options =>
            {
                options.AddPolicy(enumPolicyAuthorization.ConsultUsers.ToString("g"), policy => policy.RequireRole(enumRole.ADMIN.ToString("g"), enumRole.VISITOR.ToString("g")));
                options.AddPolicy(enumPolicyAuthorization.UpdateUser.ToString("g"), policy => policy.RequireRole(enumRole.ADMIN.ToString("g")));
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<UserChatService>();

            services.AddTransient<UserAccess>();
            services.AddTransient<MessageAccess>();
            services.AddTransient<LanguageAccess>();
            services.AddTransient<DictionaryAccess>();
            services.AddTransient<TraceAccess>();
            services.AddTransient<ContactMessageAccess>();
            services.AddTransient<RoleAccess>();
            services.AddTransient<ExperienceAccess>();

            services.AddTransient<SkillCategoryAccess>();
            services.AddTransient<SkillCategoryDetailAccess>();

            services.AddTransient<ProfileAccess>();
            services.AddTransient<DocumentAccess>();

            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IMessageManager, MessageManager>();
            services.AddTransient<ILanguageManager, LanguageManager>();
            services.AddTransient<IDictionaryManager, DictionaryManager>();
            services.AddTransient<IRoleManager, RoleManager>();

            services.AddTransient<IEmailManager, EmailManager>();
            services.AddTransient<ISkillManager, SkillManager>();
            services.AddTransient<IExperienceManager, ExperienceManager>();
            services.AddTransient<IProfileManager, ProfileManager>();

            services.AddSingleton<Requestor>(new Requestor(Configuration, "PorteFolio"));
            services.AddTransient<IEncryptManager, EncryptManager>();



            services.AddSingleton<IConfiguration>(Configuration);

            services.Configure<IISServerOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });
            services.AddHttpClient();
            services.AddTransient<ContextCurrentUser>(
            (f) =>
            {
                var currentContext = f.GetService<IHttpContextAccessor>();
                var userClaims = currentContext.HttpContext.User;
                if (Convert.ToInt32(userClaims.FindFirst("UserId")?.Value) > 0)
                {
                    return new ContextCurrentUser(userClaims);
                }
                else
                {
                    var user = new ContextCurrentUser(f.GetService<IUserManager>().Login().Result);
                    return user;
                }
            }
             );
            //services.AddDistributedSqlServerCache((opt) =>
            //{
            //    opt.ConnectionString = Configuration["connectionStrings:PorteFolio"];
            //    opt.SchemaName = "dbo";
            //    opt.TableName = "T_CACHE_DistributedCache";
            //});
            services.AddDistributedMemoryCache();
            services.AddSession(
                options =>
            {
                options.Cookie.HttpOnly = true;
                //options.Cookie.SameSite = SameSiteMode.None;
                options.IdleTimeout = TimeSpan.FromSeconds(3600);
                options.Cookie.IsEssential = true;
                //options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.Name = "GlobalDevApp";
            }
            );
            //services.AddHttpContextAccessor();
            services.AddControllers();
            services.AddSignalR();
            //services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSession();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowOriginsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCookiePolicy();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<RealTimeHub>("/msgs");
            });
        }
    }
}
