using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<NightEventsContext> (options => 
{
    options.UseMySql(builder.Configuration.GetConnectionString("NightEventsCS"), new MySqlServerVersion("8.0.22"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS", builder =>
    {
        builder.WithOrigins(new string[]
        {
            "http://localhost:8080",
            "https://localhost:8080",
            "http://127.0.0.1:8080",
            "https://127.0.0.1:8080",
            "http://localhost:5500",
            "https://localhost:5500",
            "http://127.0.0.1:5500",
            "https://127.0.0.1:5500",
            "http://localhost:5501",
            "https://localhost:5501",
            "http://127.0.0.1:5501",
            "https://127.0.0.1:5501",
            

            "http://192.168.56.1:8080",
            "http://192.168.99.1:8080",
            "http://192.168.0.14:8080",

            "http://127.0.0.1:4000",
            "https://127.0.0.1:4000",
            "http://localhost:4000",
            "https://localhost:4000",
            
        })
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new OpenApiInfo { Title = "NightEvents", Version = "v1" });

//     //  var securityScheme = new OpenApiSecurityScheme
//     // {
//     //     Name = "Authorization",
//     //     Type = SecuritySchemeType.ApiKey,
//     //     In = ParameterLocation.Header,
//     //     Description = "Standard Authorization header using the Bearer scheme.",
//     //     Scheme = CookieAuthenticationDefaults.AuthenticationScheme,
//     //     BearerFormat = "cookie",
//     // };

//     // c.AddSecurityDefinition(CookieAuthenticationDefaults.AuthenticationScheme, securityScheme);
//     // c.AddSecurityRequirement(new OpenApiSecurityRequirement
//     // {
//     //     { securityScheme, Array.Empty<string>() }
//     // });
// });

builder.Services.AddSwaggerGen(options => 
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "NightEvents", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,  //.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
        In = ParameterLocation.Header,       
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
        }
    }); 

});

var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

builder.Services.AddAuthentication(auth=>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                            .GetBytes(configuration.GetSection("AppSettings:Token").Value!)),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidAudience = "https://localhost:7037/",
                        ValidIssuer = "https://localhost:7037/",
                    };
                });

builder.Services.AddMvc();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NightEvents v1"));
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CORS");

app.UseAuthorization();

app.UseAuthentication();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    //endpoints.MapRazorPages();
});


app.Run();
