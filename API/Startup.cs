using API.enums;
using API.HubApi;
using API.Managers;
using API.Services;
using DataAccess;
using DataAccess.CRUD;
using DataAccess.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
                        "https://solvard.ddns.net", "https://solvard.ddns.net:45666", "https://192.168.0.11");
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                });
            });
           
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                 .AddJwtBearer(options =>
                 {
                     var key = Encoding.ASCII.GetBytes(Configuration["Authentication:SecretKey"]);
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

            services.AddAuthorization(options =>
            {
                options.AddPolicy(enumPolicyAuthorization.ConsultUsers.ToString("g"), policy => policy.RequireRole(enumRole.ADMIN.ToString("g"), enumRole.VISITOR.ToString("g")));
            });
            //    .AddCookie(options =>
            //{
            //    DateTime endOfDay = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, 23, 59, 59);
            //    options.ExpireTimeSpan = endOfDay.TimeOfDay;
            //    options.LoginPath = "/User/Login";
            //    options.LogoutPath = "/User/Logout";
            //});

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpContextAccessor();
            services.AddTransient<UserAccess>();
            services.AddTransient<MessageAccess>();
            services.AddTransient<LanguageAccess>();
            services.AddTransient<DictionnaryAccess>();

            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IMessageManager, MessageManager>();
            services.AddTransient<ILanguageManager, LanguageManager>();
            services.AddTransient<IDictionaryManager, DictionnaryManager>();

            services.AddTransient<EmailManager>();

            services.AddSingleton<Requestor>(new Requestor(Configuration, "PorteFolio"));
            services.AddTransient<IEncryptManager, EncryptManager>();



            services.AddSingleton<IConfiguration>(Configuration);

            services.Configure<IISServerOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });
            services.AddHttpClient();
            services.AddTransient<ContextCurrentUser>((f) =>
            {
                var currentContext = f.GetService<IHttpContextAccessor>();
                var JWToken = currentContext.HttpContext.Session.GetString("JWToken");
                if (!string.IsNullOrEmpty(JWToken) && currentContext != null && currentContext.HttpContext.User.Claims.Any()) {
                    return new ContextCurrentUser(currentContext);
                }
                else {
                    var user = new ContextCurrentUser(f.GetService<IUserManager>().Login().Result);
                    currentContext.HttpContext.Session.SetString("JWToken", user.Token);
                    return user;
                }                
            });

            services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
            services.AddSession(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.None;
                options.IdleTimeout = TimeSpan.FromSeconds(3600);
                options.Cookie.IsEssential = true;
            });
            services.AddControllers();
            services.AddSignalR();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowOriginsPolicy");
            app.UseAuthorization();
            app.UseAuthentication();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<RealTimeHub>("/msgs");
            });
        }
    }
}
