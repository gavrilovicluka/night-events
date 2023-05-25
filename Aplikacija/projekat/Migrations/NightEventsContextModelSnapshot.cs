﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

#nullable disable

namespace projekat.Migrations
{
    [DbContext(typeof(NightEventsContext))]
    partial class NightEventsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Models.Administrator", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fleg")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.ToTable("Administratori");
                });

            modelBuilder.Entity("Models.Dogadjaj", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("BrojRezervacija")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DatumIVreme")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<int?>("KlubID")
                        .HasColumnType("int");

                    b.Property<int?>("MuzickiIzvodjacID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.HasIndex("KlubID");

                    b.HasIndex("MuzickiIzvodjacID");

                    b.ToTable("Dogadjaji");
                });

            modelBuilder.Entity("Models.Karta", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Cena")
                        .HasColumnType("int");

                    b.Property<int?>("DogadjajID")
                        .HasColumnType("int");

                    b.Property<int?>("KorisnikID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("DogadjajID");

                    b.HasIndex("KorisnikID");

                    b.ToTable("Karte");
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.Property<int>("ID")
                        .HasColumnType("int");

                    b.Property<int>("BrojStolova")
                        .HasColumnType("int");

                    b.Property<string>("Lokacija")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.ToTable("Klubovi");
                });

            modelBuilder.Entity("Models.KomentarDogadjaj", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("DogadjajID")
                        .HasColumnType("int");

                    b.Property<int?>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<string>("Sadrzaj")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("DogadjajID");

                    b.HasIndex("KorisnikID");

                    b.ToTable("KomentariDogadjaji");
                });

            modelBuilder.Entity("Models.KomentarIzvodjac", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("KorisnikID")
                        .HasColumnType("int");

                    b.Property<int?>("MuzickiIzvodjacID")
                        .HasColumnType("int");

                    b.Property<string>("Sadrzaj")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("KorisnikID");

                    b.HasIndex("MuzickiIzvodjacID");

                    b.ToTable("KomentariIzvodjaci");
                });

            modelBuilder.Entity("Models.Korisnik", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fleg")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.ToTable("Korisnici");
                });

            modelBuilder.Entity("Models.MuzickiIzvodjac", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("BrClanova")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fleg")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("ImeIzvodjaca")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Zanr")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("ID");

                    b.ToTable("MuzickiIzvodjaci");
                });

            modelBuilder.Entity("Models.OcenaKlub", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("KlubID")
                        .HasColumnType("int");

                    b.Property<int>("Ocena")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("KlubID");

                    b.ToTable("OceneKlubova");
                });

            modelBuilder.Entity("Models.OcenaMuzickiIzvodjac", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int?>("MuzickiIzvodjacID")
                        .HasColumnType("int");

                    b.Property<int>("Ocena")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("MuzickiIzvodjacID");

                    b.ToTable("OceneIzvodjaca");
                });

            modelBuilder.Entity("Models.Organizator", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fleg")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.ToTable("Organizatori");
                });

            modelBuilder.Entity("Models.Rezervacija", b =>
                {
                    b.Property<int>("ID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime2");

                    b.Property<int>("DogadjajID")
                        .HasColumnType("int");

                    b.Property<int>("KorisnikID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("DogadjajID");

                    b.HasIndex("KorisnikID");

                    b.ToTable("Rezervacije");
                });

            modelBuilder.Entity("Models.Sto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("DogadjajID")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("DogadjajID");

                    b.ToTable("Stolovi");
                });

            modelBuilder.Entity("Models.TerminiIzvodjaca", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("MuzickiIzvodjacID")
                        .HasColumnType("int");

                    b.Property<DateTime>("Termin")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("MuzickiIzvodjacID");

                    b.ToTable("TerminiIzvodjaca");
                });

            modelBuilder.Entity("Models.Dogadjaj", b =>
                {
                    b.HasOne("Models.Klub", "Klub")
                        .WithMany("Dogadjaji")
                        .HasForeignKey("KlubID");

                    b.HasOne("Models.MuzickiIzvodjac", "MuzickiIzvodjac")
                        .WithMany("Dogadjaji")
                        .HasForeignKey("MuzickiIzvodjacID");

                    b.Navigation("Klub");

                    b.Navigation("MuzickiIzvodjac");
                });

            modelBuilder.Entity("Models.Karta", b =>
                {
                    b.HasOne("Models.Dogadjaj", "Dogadjaj")
                        .WithMany("Karte")
                        .HasForeignKey("DogadjajID");

                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany("Karte")
                        .HasForeignKey("KorisnikID");

                    b.Navigation("Dogadjaj");

                    b.Navigation("Korisnik");
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.HasOne("Models.Organizator", "Organizator")
                        .WithOne("Klub")
                        .HasForeignKey("Models.Klub", "ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organizator");
                });

            modelBuilder.Entity("Models.KomentarDogadjaj", b =>
                {
                    b.HasOne("Models.Dogadjaj", "Dogadjaj")
                        .WithMany("KomentariDogadjaj")
                        .HasForeignKey("DogadjajID");

                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany("KomentariDogadjaji")
                        .HasForeignKey("KorisnikID");

                    b.Navigation("Dogadjaj");

                    b.Navigation("Korisnik");
                });

            modelBuilder.Entity("Models.KomentarIzvodjac", b =>
                {
                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany("KomentariIzvodjaci")
                        .HasForeignKey("KorisnikID");

                    b.HasOne("Models.MuzickiIzvodjac", "MuzickiIzvodjac")
                        .WithMany("KomentariIzvodjac")
                        .HasForeignKey("MuzickiIzvodjacID");

                    b.Navigation("Korisnik");

                    b.Navigation("MuzickiIzvodjac");
                });

            modelBuilder.Entity("Models.OcenaKlub", b =>
                {
                    b.HasOne("Models.Klub", "Klub")
                        .WithMany("Ocene")
                        .HasForeignKey("KlubID");

                    b.Navigation("Klub");
                });

            modelBuilder.Entity("Models.OcenaMuzickiIzvodjac", b =>
                {
                    b.HasOne("Models.MuzickiIzvodjac", "MuzickiIzvodjac")
                        .WithMany("Ocene")
                        .HasForeignKey("MuzickiIzvodjacID");

                    b.Navigation("MuzickiIzvodjac");
                });

            modelBuilder.Entity("Models.Rezervacija", b =>
                {
                    b.HasOne("Models.Dogadjaj", "Dogadjaj")
                        .WithMany("Rezervacije")
                        .HasForeignKey("DogadjajID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Sto", "Sto")
                        .WithOne("Rezervacija")
                        .HasForeignKey("Models.Rezervacija", "ID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany("Rezervacije")
                        .HasForeignKey("KorisnikID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dogadjaj");

                    b.Navigation("Korisnik");

                    b.Navigation("Sto");
                });

            modelBuilder.Entity("Models.Sto", b =>
                {
                    b.HasOne("Models.Dogadjaj", "Dogadjaj")
                        .WithMany("Stolovi")
                        .HasForeignKey("DogadjajID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dogadjaj");
                });

            modelBuilder.Entity("Models.TerminiIzvodjaca", b =>
                {
                    b.HasOne("Models.MuzickiIzvodjac", "MuzickiIzvodjac")
                        .WithMany("Termini")
                        .HasForeignKey("MuzickiIzvodjacID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MuzickiIzvodjac");
                });

            modelBuilder.Entity("Models.Dogadjaj", b =>
                {
                    b.Navigation("Karte");

                    b.Navigation("KomentariDogadjaj");

                    b.Navigation("Rezervacije");

                    b.Navigation("Stolovi");
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.Navigation("Dogadjaji");

                    b.Navigation("Ocene");
                });

            modelBuilder.Entity("Models.Korisnik", b =>
                {
                    b.Navigation("Karte");

                    b.Navigation("KomentariDogadjaji");

                    b.Navigation("KomentariIzvodjaci");

                    b.Navigation("Rezervacije");
                });

            modelBuilder.Entity("Models.MuzickiIzvodjac", b =>
                {
                    b.Navigation("Dogadjaji");

                    b.Navigation("KomentariIzvodjac");

                    b.Navigation("Ocene");

                    b.Navigation("Termini");
                });

            modelBuilder.Entity("Models.Organizator", b =>
                {
                    b.Navigation("Klub");
                });

            modelBuilder.Entity("Models.Sto", b =>
                {
                    b.Navigation("Rezervacija");
                });
#pragma warning restore 612, 618
        }
    }
}
