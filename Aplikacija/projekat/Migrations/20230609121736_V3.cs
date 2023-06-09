using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projekat.Migrations
{
    /// <inheritdoc />
    public partial class V3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Karte");

            migrationBuilder.DropTable(
                name: "OceneIzvodjaca");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Klubovi",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Klubovi",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Klubovi");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Klubovi");

            migrationBuilder.CreateTable(
                name: "Karte",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DogadjajID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false)
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
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OceneIzvodjaca",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: true),
                    Ocena = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneIzvodjaca", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneIzvodjaca_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Karte_DogadjajID",
                table: "Karte",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_Karte_KorisnikID",
                table: "Karte",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneIzvodjaca_MuzickiIzvodjacID",
                table: "OceneIzvodjaca",
                column: "MuzickiIzvodjacID");
        }
    }
}
