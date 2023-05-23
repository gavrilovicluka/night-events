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
            migrationBuilder.DropColumn(
                name: "Ime",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Ocena",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Prezime",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "Ocena",
                table: "Klubovi");

            migrationBuilder.RenameColumn(
                name: "BrStola",
                table: "Rezervacije",
                newName: "StoID");

            migrationBuilder.RenameColumn(
                name: "Kapacitet",
                table: "Klubovi",
                newName: "BrojStolova");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Organizatori",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "BrojRezervacija",
                table: "Dogadjaji",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OceneIzvodjaca",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneIzvodjaca", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneIzvodjaca_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OceneKlubova",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OceneKlubova", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OceneKlubova_Klubovi_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klubovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stolovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stolovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stolovi_Klubovi_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klubovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacije_StoID",
                table: "Rezervacije",
                column: "StoID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneIzvodjaca_MuzickiIzvodjacID",
                table: "OceneIzvodjaca",
                column: "MuzickiIzvodjacID");

            migrationBuilder.CreateIndex(
                name: "IX_OceneKlubova_KlubID",
                table: "OceneKlubova",
                column: "KlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Stolovi_KlubID",
                table: "Stolovi",
                column: "KlubID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacije_Stolovi_StoID",
                table: "Rezervacije",
                column: "StoID",
                principalTable: "Stolovi",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacije_Stolovi_StoID",
                table: "Rezervacije");

            migrationBuilder.DropTable(
                name: "OceneIzvodjaca");

            migrationBuilder.DropTable(
                name: "OceneKlubova");

            migrationBuilder.DropTable(
                name: "Stolovi");

            migrationBuilder.DropIndex(
                name: "IX_Rezervacije_StoID",
                table: "Rezervacije");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Organizatori");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "MuzickiIzvodjaci");

            migrationBuilder.DropColumn(
                name: "BrojRezervacija",
                table: "Dogadjaji");

            migrationBuilder.RenameColumn(
                name: "StoID",
                table: "Rezervacije",
                newName: "BrStola");

            migrationBuilder.RenameColumn(
                name: "BrojStolova",
                table: "Klubovi",
                newName: "Kapacitet");

            migrationBuilder.AddColumn<string>(
                name: "Ime",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Ocena",
                table: "MuzickiIzvodjaci",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Prezime",
                table: "MuzickiIzvodjaci",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Ocena",
                table: "Klubovi",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
