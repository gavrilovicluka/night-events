﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

#nullable disable

namespace projekat.Migrations
{
    [DbContext(typeof(NightEventsContext))]
    [Migration("20230521163453_V2")]
    partial class V2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int?>("OrganizatorID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("KlubID");

                    b.HasIndex("MuzickiIzvodjacID");

                    b.HasIndex("OrganizatorID");

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
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Kapacitet")
                        .HasColumnType("int");

                    b.Property<string>("Lokacija")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double>("Ocena")
                        .HasColumnType("float");

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

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("ImeIzvodjaca")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double>("Ocena")
                        .HasColumnType("float");

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

                    b.Property<string>("Zanr")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("ID");

                    b.ToTable("MuzickiIzvodjaci");
                });

            modelBuilder.Entity("Models.Organizator", b =>
                {
                    b.Property<int>("ID")
                        .HasColumnType("int");

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

                    b.ToTable("Organizatori");
                });

            modelBuilder.Entity("Models.Rezervacija", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("BrStola")
                        .HasColumnType("int");

                    b.Property<int>("DogadjajID")
                        .HasColumnType("int");

                    b.Property<int?>("KorisnikID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("DogadjajID");

                    b.HasIndex("KorisnikID");

                    b.ToTable("Rezervacije");
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

                    b.HasOne("Models.Organizator", "Organizator")
                        .WithMany("Dogadjaji")
                        .HasForeignKey("OrganizatorID");

                    b.Navigation("Klub");

                    b.Navigation("MuzickiIzvodjac");

                    b.Navigation("Organizator");
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

            modelBuilder.Entity("Models.Organizator", b =>
                {
                    b.HasOne("Models.Klub", "Klub")
                        .WithOne("Organizator")
                        .HasForeignKey("Models.Organizator", "ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Klub");
                });

            modelBuilder.Entity("Models.Rezervacija", b =>
                {
                    b.HasOne("Models.Dogadjaj", "Dogadjaj")
                        .WithMany("Rezervacije")
                        .HasForeignKey("DogadjajID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany("Rezervacije")
                        .HasForeignKey("KorisnikID");

                    b.Navigation("Dogadjaj");

                    b.Navigation("Korisnik");
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
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.Navigation("Dogadjaji");

                    b.Navigation("Organizator");
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

                    b.Navigation("Termini");
                });

            modelBuilder.Entity("Models.Organizator", b =>
                {
                    b.Navigation("Dogadjaji");
                });
#pragma warning restore 612, 618
        }
    }
}
