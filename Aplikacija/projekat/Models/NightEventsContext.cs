using Microsoft.EntityFrameworkCore;

namespace Models;

public class NightEventsContext : DbContext
{
    public DbSet<Administrator> Administratori { get; set; }

    public DbSet<Dogadjaj> Dogadjaji { get; set; }  

    public DbSet<Klub> Klubovi { get; set; }

    public DbSet<Korisnik> Korisnici { get; set; }  

    public DbSet<MuzickiIzvodjac> MuzickiIzvodjaci { get; set; }    

    public DbSet<Organizator> Organizatori { get; set; }

    public DbSet<Rezervacija> Rezervacije { get; set; }
    public DbSet<TerminiIzvodjaca> TerminiIzvodjaca { get; set; }
    public DbSet<OcenaKlub> OceneKlubova { get; set; }
    
    public DbSet<Sto> Stolovi { get; set; }
    public DbSet<StoBarski> StoloviBS { get; set; }
    public DbSet<StoSepare> StoloviS { get; set; }
    public DbSet<StoVisokoSedenje> StoloviVS { get; set; }


    public NightEventsContext(DbContextOptions options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administrator>(entity =>
        {
            entity.Property(e => e.PasswordHash).HasColumnType("longblob");
            entity.Property(e => e.PasswordSalt).HasColumnType("longblob");
            entity.Property(e => e.Email).HasColumnType("nvarchar(255)");
        });

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Organizator>()
            .HasOne(e => e.Klub)
            .WithOne(e => e.Organizator)
            .HasForeignKey<Klub>(k => k.ID);


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