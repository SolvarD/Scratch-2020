using API.HubApi;
using API.Managers;
using DataAccess;
using DataAccess.CRUD;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
                    builder.WithOrigins("https://localhost:44359","https://localhost:44303", 
                        "https://localhost:45666", "https://localhost:443",
                        "http://solvard.ddns.net", "https://solvard.ddns.net", "https://solvard.ddns.net:45666");
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                });
            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<UserAccess>();
            services.AddTransient<MessageAccess>();

            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IMessageManager, MessageManager>();



            services.AddSingleton<IConfiguration>(Configuration);

            services.Configure<IISServerOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });

            //services.AddTransient<User>((f) => {
            //    var httpContextAccessor = f.GetService<IHttpContextAccessor>();
            //    return (httpContextAccessor.HttpContext != null)
            //        ? (User)new User(httpContextAccessor)
            //        : (User)new SchedulerUserService();
            //});

            services.AddHttpContextAccessor();
            services.AddControllers();
            services.AddSignalR();
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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<RealTimeHub>("/msgs");
            });
        }
    }
}
