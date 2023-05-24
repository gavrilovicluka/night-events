using Microsoft.EntityFrameworkCore;

namespace Models;

public class NightEventsContext : DbContext
{
    public DbSet<Administrator> Administratori { get; set; }

    public DbSet<Dogadjaj> Dogadjaji { get; set; }  

    public DbSet<Karta> Karte { get; set; }

    public DbSet<Klub> Klubovi { get; set; }

    public DbSet<KomentarDogadjaj> KomentariDogadjaji { get; set; }

    public DbSet<KomentarIzvodjac> KomentariIzvodjaci { get; set; }

    public DbSet<Korisnik> Korisnici { get; set; }  

    public DbSet<MuzickiIzvodjac> MuzickiIzvodjaci { get; set; }    

    public DbSet<Organizator> Organizatori { get; set; }

    public DbSet<Rezervacija> Rezervacije { get; set; }
    public DbSet<TerminiIzvodjaca> TerminiIzvodjaca { get; set; }
    public DbSet<OcenaKlub> OceneKlubova { get; set; }
    public DbSet<OcenaMuzickiIzvodjac> OceneIzvodjaca { get; set; }
    
    public DbSet<Sto> Stolovi { get; set; }


    public NightEventsContext(DbContextOptions options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Klub>()
            .HasOne(k => k.Organizator)
            .WithOne(o => o.Klub)
            .HasForeignKey<Organizator>(o => o.ID);

        modelBuilder.Entity<Sto>()
            .HasOne(k => k.Rezervacija)
            .WithOne(o => o.Sto)
            .HasForeignKey<Rezervacija>(o => o.ID)
            .OnDelete(DeleteBehavior.NoAction);
            
        modelBuilder.Entity<Organizator>()
            .Property(s => s.Status)
            .HasConversion<string>();

        modelBuilder.Entity<MuzickiIzvodjac>()
            .Property(s => s.Status)
            .HasConversion<string>();

        modelBuilder.Entity<Sto>()
            .Property(s => s.Status)
            .HasConversion<string>();


    }
  
}