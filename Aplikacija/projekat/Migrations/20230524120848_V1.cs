using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projekat.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administratori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administratori", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Klubovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Lokacija = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojStolova = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klubovi", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MuzickiIzvodjaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zanr = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BrClanova = table.Column<int>(type: "int", nullable: false),
                    ImeIzvodjaca = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuzickiIzvodjaci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OceneKlubova",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneKlubova", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneKlubova_Klubovi_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klubovi",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Organizatori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizatori", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Organizatori_Klubovi_ID",
                        column: x => x.ID,
                        principalTable: "Klubovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dogadjaji",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DatumIVreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: true),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: true),
                    BrojRezervacija = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dogadjaji", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Dogadjaji_Klubovi_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klubovi",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Dogadjaji_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "KomentariIzvodjaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sadrzaj = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KomentariIzvodjaci", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KomentariIzvodjaci_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_KomentariIzvodjaci_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "OceneIzvodjaca",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneIzvodjaca", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneIzvodjaca_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "TerminiIzvodjaca",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: false),
                    Termin = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminiIzvodjaca", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TerminiIzvodjaca_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Karte",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    DogadjajID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Karte", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Karte_Dogadjaji_DogadjajID",
                        column: x => x.DogadjajID,
                        principalTable: "Dogadjaji",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Karte_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "KomentariDogadjaji",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sadrzaj = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    DogadjajID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KomentariDogadjaji", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KomentariDogadjaji_Dogadjaji_DogadjajID",
                        column: x => x.DogadjajID,
                        principalTable: "Dogadjaji",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_KomentariDogadjaji_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Stolovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DogadjajID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stolovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stolovi_Dogadjaji_DogadjajID",
                        column: x => x.DogadjajID,
                        principalTable: "Dogadjaji",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rezervacije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: false),
                    DogadjajID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervacije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rezervacije_Dogadjaji_DogadjajID",
                        column: x => x.DogadjajID,
                        principalTable: "Dogadjaji",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rezervacije_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rezervacije_Stolovi_ID",
                        column: x => x.ID,
                        principalTable: "Stolovi",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dogadjaji_KlubID",
                table: "Dogadjaji",
                column: "KlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Dogadjaji_MuzickiIzvodjacID",
                table: "Dogadjaji",
                column: "MuzickiIzvodjacID");

            migrationBuilder.CreateIndex(
                name: "IX_Karte_DogadjajID",
                table: "Karte",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_Karte_KorisnikID",
                table: "Karte",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariDogadjaji_DogadjajID",
                table: "KomentariDogadjaji",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariDogadjaji_KorisnikID",
                table: "KomentariDogadjaji",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariIzvodjaci_KorisnikID",
                table: "KomentariIzvodjaci",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariIzvodjaci_MuzickiIzvodjacID",
                table: "KomentariIzvodjaci",
                column: "MuzickiIzvodjacID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneIzvodjaca_MuzickiIzvodjacID",
                table: "OceneIzvodjaca",
                column: "MuzickiIzvodjacID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneKlubova_KlubID",
                table: "OceneKlubova",
                column: "KlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_DogadjajID",
                table: "Rezervacije",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_KorisnikID",
                table: "Rezervacije",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Stolovi_DogadjajID",
                table: "Stolovi",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_TerminiIzvodjaca_MuzickiIzvodjacID",
                table: "TerminiIzvodjaca",
                column: "MuzickiIzvodjacID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administratori");

            migrationBuilder.DropTable(
                name: "Karte");

            migrationBuilder.DropTable(
                name: "KomentariDogadjaji");

            migrationBuilder.DropTable(
                name: "KomentariIzvodjaci");

            migrationBuilder.DropTable(
                name: "OceneIzvodjaca");

            migrationBuilder.DropTable(
                name: "OceneKlubova");

            migrationBuilder.DropTable(
                name: "Organizatori");

            migrationBuilder.DropTable(
                name: "Rezervacije");

            migrationBuilder.DropTable(
                name: "TerminiIzvodjaca");

            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "Stolovi");

            migrationBuilder.DropTable(
                name: "Dogadjaji");

            migrationBuilder.DropTable(
                name: "Klubovi");

            migrationBuilder.DropTable(
                name: "MuzickiIzvodjaci");
        }
    }
}
